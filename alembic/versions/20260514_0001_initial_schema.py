"""initial schema

Revision ID: 20260514_0001
Revises:
Create Date: 2026-05-14
"""

from alembic import op
import sqlalchemy as sa


revision = "20260514_0001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "users",
        sa.Column("id", sa.String(), nullable=False),
        sa.Column("email", sa.String(), nullable=False),
        sa.Column("password", sa.String(), nullable=False),
        sa.Column("role", sa.String(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("email"),
    )
    op.create_table(
        "customers",
        sa.Column("id", sa.String(), nullable=False),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("email", sa.String(), nullable=False),
        sa.Column("phone", sa.String(), nullable=True),
        sa.Column("address", sa.String(), nullable=True),
        sa.Column("owner_id", sa.String(), nullable=True),
        sa.ForeignKeyConstraint(["owner_id"], ["users.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "opportunities",
        sa.Column("id", sa.String(), nullable=False),
        sa.Column("title", sa.String(), nullable=False),
        sa.Column(
            "status",
            sa.Enum("LEAD", "CONTACTED", "PROPOSAL", "WON", "LOST", name="opportunitystatus"),
            nullable=True,
        ),
        sa.Column("value", sa.Float(), nullable=False),
        sa.Column("customer_id", sa.String(), nullable=False),
        sa.Column("owner_id", sa.String(), nullable=True),
        sa.ForeignKeyConstraint(["customer_id"], ["customers.id"]),
        sa.ForeignKeyConstraint(["owner_id"], ["users.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "activities",
        sa.Column("id", sa.String(), nullable=False),
        sa.Column("title", sa.String(), nullable=False),
        sa.Column("description", sa.String(), nullable=True),
        sa.Column("type", sa.Enum("CALL", "MEETING", "TASK", "EMAIL", name="activitytype"), nullable=False),
        sa.Column("status", sa.Enum("PENDING", "DONE", name="activitystatus"), nullable=True),
        sa.Column("due_date", sa.DateTime(), nullable=True),
        sa.Column("customer_id", sa.String(), nullable=True),
        sa.Column("opportunity_id", sa.String(), nullable=True),
        sa.Column("owner_id", sa.String(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(["customer_id"], ["customers.id"]),
        sa.ForeignKeyConstraint(["opportunity_id"], ["opportunities.id"]),
        sa.ForeignKeyConstraint(["owner_id"], ["users.id"]),
        sa.PrimaryKeyConstraint("id"),
    )


def downgrade():
    op.drop_table("activities")
    op.drop_table("opportunities")
    op.drop_table("customers")
    op.drop_table("users")
    if op.get_bind().dialect.name == "postgresql":
        op.execute("DROP TYPE IF EXISTS activitystatus")
        op.execute("DROP TYPE IF EXISTS activitytype")
        op.execute("DROP TYPE IF EXISTS opportunitystatus")
