import re

from app.core.config import Settings


VERCEL_PREVIEW_REGEX = r"^https://(project-crm-[a-z0-9-]+|project-[a-z0-9-]+-kuro-nacho-ramiro)\.vercel\.app$"


def test_cors_origin_regex_is_optional(monkeypatch):
    monkeypatch.delenv("CORS_ORIGIN_REGEX", raising=False)

    settings = Settings()

    assert settings.cors_origin_regex is None


def test_cors_origin_regex_reads_environment(monkeypatch):
    monkeypatch.setenv("CORS_ORIGIN_REGEX", VERCEL_PREVIEW_REGEX)

    settings = Settings()

    assert settings.cors_origin_regex == VERCEL_PREVIEW_REGEX


def test_vercel_preview_regex_matches_expected_origins():
    assert re.fullmatch(VERCEL_PREVIEW_REGEX, "https://project-crm-woad.vercel.app")
    assert re.fullmatch(VERCEL_PREVIEW_REGEX, "https://project-glljzsti5-kuro-nacho-ramiro.vercel.app")
    assert not re.fullmatch(VERCEL_PREVIEW_REGEX, "https://example.vercel.app")
