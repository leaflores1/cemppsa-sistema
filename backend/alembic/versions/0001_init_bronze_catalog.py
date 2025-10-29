from alembic import op
import sqlalchemy as sa

revision = "0001_init_bronze_catalog"
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    op.create_table(
        "file_registry",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("batch_uuid", sa.String(36), nullable=False, unique=True),
        sa.Column("device_id", sa.String(100), nullable=False),
        sa.Column("technician_id", sa.String(100), nullable=False),
        sa.Column("created_at", sa.DateTime, nullable=False),
        sa.Column("server_received_at", sa.DateTime, nullable=False),
        sa.Column("status", sa.String(20), nullable=False),
        sa.Column("source", sa.String(30), nullable=True),
    )
    op.create_table(
        "readings_raw",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("batch_uuid", sa.String(36), nullable=False),
        sa.Column("client_row_id", sa.Integer, nullable=False),
        sa.Column("instrument_code", sa.String(50), nullable=False),
        sa.Column("parameter", sa.String(50), nullable=False),
        sa.Column("unit", sa.String(20), nullable=False),
        sa.Column("value", sa.Float, nullable=False),
        sa.Column("measured_at", sa.DateTime, nullable=False),
        sa.Column("notes", sa.Text, nullable=True),
        sa.Column("row_hash", sa.String(64), nullable=True),
        sa.Column("inserted_at", sa.DateTime, nullable=False),
        sa.UniqueConstraint("batch_uuid", "client_row_id", name="uq_batch_row"),
    )
    op.create_table(
        "catalog_instruments",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("instrument_code", sa.String(50), nullable=False, unique=True),
        sa.Column("name", sa.String(120), nullable=False),
        sa.Column("type", sa.String(50), nullable=False),
    )
    op.create_table(
        "catalog_units",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("unit_code", sa.String(20), nullable=False),
        sa.Column("description", sa.String(120), nullable=False),
    )
    op.create_table(
        "etl_jobs",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("batch_uuid", sa.String(36), nullable=True),
        sa.Column("status", sa.String(20), nullable=False),
        sa.Column("started_at", sa.DateTime, nullable=True),
        sa.Column("finished_at", sa.DateTime, nullable=True),
        sa.Column("message", sa.String(255), nullable=True),
    )

def downgrade():
    op.drop_table("etl_jobs")
    op.drop_table("catalog_units")
    op.drop_table("catalog_instruments")
    op.drop_table("readings_raw")
    op.drop_table("file_registry")
