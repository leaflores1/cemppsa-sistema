"""initial schema

Revision ID: 6510d2d264bf
Revises:
Create Date: 2025-11-27 10:04:38.090918
"""

from alembic import op
import sqlalchemy as sa
from typing import Sequence, Union

# revision identifiers, used by Alembic.
revision: str = "6510d2d264bf"
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """
    Create initial Silver tables.
    """

    # -----------------------------
    # 1) Tabla: silver_planillas
    # -----------------------------
    op.create_table(
        "silver_planillas",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("batch_uuid", sa.String(64), nullable=False),
        sa.Column("estado", sa.String(50), nullable=True),
        sa.Column("creado_en", sa.DateTime(), nullable=True),
        sa.Column("aprobado_por", sa.String(100), nullable=True),
        sa.Column("aprobado_en", sa.DateTime(), nullable=True),
    )

    # -----------------------------
    # 2) Tabla: silver_lecturas
    # -----------------------------
    op.create_table(
        "silver_lecturas",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("planilla_id", sa.Integer(), sa.ForeignKey("silver_planillas.id")),
        sa.Column("instrumento_id", sa.Integer(), nullable=True),
        sa.Column("variable_id", sa.Integer(), nullable=True),
        sa.Column("unidad_id", sa.Integer(), nullable=True),
        sa.Column("valor", sa.Float(), nullable=True),
        sa.Column("fecha", sa.DateTime(), nullable=True),
        sa.Column("origen", sa.String(50), nullable=True),
    )


def downgrade() -> None:
    """
    Drop Silver tables.
    """
    op.drop_table("silver_lecturas")
    op.drop_table("silver_planillas")
