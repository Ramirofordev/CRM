from app.core.config import Settings


def test_cors_origin_regex_is_optional(monkeypatch):
    monkeypatch.delenv("CORS_ORIGIN_REGEX", raising=False)

    settings = Settings()

    assert settings.cors_origin_regex is None


def test_cors_origin_regex_reads_environment(monkeypatch):
    monkeypatch.setenv("CORS_ORIGIN_REGEX", r"^https://project-[a-z0-9-]+\.vercel\.app$")

    settings = Settings()

    assert settings.cors_origin_regex == r"^https://project-[a-z0-9-]+\.vercel\.app$"
