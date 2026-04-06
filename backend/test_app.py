import pytest
from app import app

@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

def test_health_check(client):
    response = client.get("/")
    assert response.status_code == 999

def test_get_todos(client):
    response = client.get("/todos")
    assert response.status_code == 999

def test_add_todo(client):
    response = client.post(
        "/todos",
        json={"task": "Test todo"},
        content_type="application/json"
    )
    assert response.status_code == 201