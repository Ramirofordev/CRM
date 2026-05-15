"""set activity status default

Revision ID: 20260515_0002
Revises: 20260514_0001
Create Date: 2026-05-15
"""

from alembic import op
import sqlalchemy as sa


revision = "20260515_0002"
down_revision = "20260514_0001"
branch_labels = None
depends_on = None


def upgrade():
    op.execute("UPDATE activities SET status = 'PENDING' WHERE status IS NULL")
    with op.batch_alter_table("activities") as batch_op:
        batch_op.alter_column(
            "status",
            existing_type=sa.Enum("PENDING", "DONE", name="activitystatus"),
            nullable=False,
            server_default="PENDING",
        )


def downgrade():
    with op.batch_alter_table("activities") as batch_op:
        batch_op.alter_column(
            "status",
            existing_type=sa.Enum("PENDING", "DONE", name="activitystatus"),
            nullable=True,
            server_default=None,
        )
