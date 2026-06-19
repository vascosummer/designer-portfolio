from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


# ============================================================
# Models
# ============================================================
class Project(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    slug: str
    index: int
    year: int
    title: str
    role: str
    disciplines: List[str]
    outcome: str
    description: str
    hero_image: str
    color: str = "#16161A"
    is_featured: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ProjectCreate(BaseModel):
    slug: str
    index: int
    year: int
    title: str
    role: str
    disciplines: List[str]
    outcome: str
    description: str
    hero_image: str
    color: str = "#16161A"
    is_featured: bool = True


class PracticeChapter(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    number: str
    title: str
    discipline: str
    body: str


class StudioInfo(BaseModel):
    model_config = ConfigDict(extra="ignore")

    name: str
    title: str
    location: str
    availability: str
    email: str
    bio: str
    principles: List[str]
    tools: List[str]
    now: str


class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    company: Optional[str] = None
    engagement_type: str
    budget_range: Optional[str] = None
    timeline: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    engagement_type: str
    budget_range: Optional[str] = None
    timeline: Optional[str] = None
    message: str


# ============================================================
# Seed data — fallback content (Lorem ipsum placeholders)
# ============================================================
SEED_PROJECTS = [
    {
        "slug": "lorem-protocol",
        "index": 1,
        "year": 2025,
        "title": "Lorem Protocol",
        "role": "UI Lead, System Architecture",
        "disciplines": ["Product", "Design System"],
        "outcome": "Rebuilt the identity system that now ships across fourteen markets.",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "hero_image": "https://images.unsplash.com/photo-1635776063043-ca3d420fac39?w=1600&q=80",
        "color": "#2A2520",
        "is_featured": True,
    },
    {
        "slug": "ipsum-financial",
        "index": 2,
        "year": 2024,
        "title": "Ipsum Financial",
        "role": "Creative Direction",
        "disciplines": ["Brand", "Product"],
        "outcome": "A complete brand reposition that doubled qualified inbound.",
        "description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "hero_image": "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=1600&q=80",
        "color": "#1A2128",
        "is_featured": True,
    },
    {
        "slug": "dolor-studio",
        "index": 3,
        "year": 2024,
        "title": "Dolor Studio",
        "role": "UI Lead",
        "disciplines": ["Product", "UI"],
        "outcome": "Shipped the editor surface used by 40k creators daily.",
        "description": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "hero_image": "https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?w=1600&q=80",
        "color": "#2A1B1B",
        "is_featured": True,
    },
    {
        "slug": "consectetur-os",
        "index": 4,
        "year": 2023,
        "title": "Consectetur OS",
        "role": "Design Systems Lead",
        "disciplines": ["Design System", "UI"],
        "outcome": "One library, 280 components, twelve teams. Documented end-to-end.",
        "description": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "hero_image": "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=1600&q=80",
        "color": "#152120",
        "is_featured": True,
    },
    {
        "slug": "adipiscing-labs",
        "index": 5,
        "year": 2023,
        "title": "Adipiscing Labs",
        "role": "Brand & Identity",
        "disciplines": ["Brand"],
        "outcome": "A wordmark and identity adopted across seven product surfaces.",
        "description": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        "hero_image": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=80",
        "color": "#28210F",
        "is_featured": True,
    },
    {
        "slug": "elit-foundation",
        "index": 6,
        "year": 2022,
        "title": "Elit Foundation",
        "role": "Creative Direction, UI",
        "disciplines": ["Brand", "Product", "UI"],
        "outcome": "A non-profit platform now serving more than 2M monthly.",
        "description": "Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae.",
        "hero_image": "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1600&q=80",
        "color": "#0E0E0E",
        "is_featured": True,
    },
]


# ============================================================
# Routes
# ============================================================
@api_router.get("/")
async def root():
    return {"message": "Quiet Craft — CMS online"}


@api_router.get("/projects", response_model=List[Project])
async def list_projects():
    docs = await db.projects.find({}, {"_id": 0}).sort("index", 1).to_list(100)
    return [Project(**d) for d in docs]


@api_router.get("/projects/{slug}", response_model=Project)
async def get_project(slug: str):
    doc = await db.projects.find_one({"slug": slug}, {"_id": 0})
    if not doc:
        raise HTTPException(404, "Project not found")
    return Project(**doc)


@api_router.post("/projects", response_model=Project)
async def create_project(payload: ProjectCreate):
    project = Project(**payload.model_dump())
    doc = project.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.projects.insert_one(doc)
    return project


@api_router.post("/contact", response_model=ContactSubmission)
async def submit_contact(payload: ContactCreate):
    submission = ContactSubmission(**payload.model_dump())
    doc = submission.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.contact_submissions.insert_one(doc)
    return submission


@api_router.get("/contact", response_model=List[ContactSubmission])
async def list_contacts():
    docs = await db.contact_submissions.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for d in docs:
        if isinstance(d.get("created_at"), str):
            d["created_at"] = datetime.fromisoformat(d["created_at"])
    return [ContactSubmission(**d) for d in docs]


# ============================================================
# App wiring
# ============================================================
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def seed_projects():
    """Seed projects if collection is empty."""
    count = await db.projects.count_documents({})
    if count == 0:
        for p in SEED_PROJECTS:
            project = Project(**p)
            doc = project.model_dump()
            doc["created_at"] = doc["created_at"].isoformat()
            await db.projects.insert_one(doc)
        logger.info(f"Seeded {len(SEED_PROJECTS)} projects.")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
