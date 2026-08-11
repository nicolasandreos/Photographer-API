import { buildApp } from "../../../api/app";
import request from "supertest";
import { describe, it, expect } from "vitest";
import { SEED_PHOTOGRAPHERS } from "../../../infra/database/seed";
import { JwtTokenService } from "../../../infra/adapters/jwt-token-service";

describe("Photographer API", () => {
  const app = buildApp();
  const tokenService = new JwtTokenService();

  it("should get photographer by id", async () => {
    const response = await request(app).get("/photographer/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
        id: "1",
        name: "Ana Costa",
        email: "ana.costa@luzestudio.fake",
        phoneNumber: "11910904129",
        studioName: "Luz & Sombra Fotografia",
        isActive: true,
        emailVerified: true,
        profilePictureUrl: null,
    });
  })

  it("should return 404 if photographer not found", async () => {
    const response = await request(app).get("/photographer/999");
    expect(response.status).toBe(404);
  })

  it("should get all photographers", async () => {
    const administratorToken = tokenService.generateAccessToken({
        sub: "1",
        email: "admin.one@photostudio.fake",
    })
    const response = await request(app)
        .get("/photographer/all")
        .set("Authorization", `Bearer ${administratorToken}`);
    expect(response.status).toBe(200);
    const expectedPhotographers = SEED_PHOTOGRAPHERS.map((photographer) => ({
      id: photographer.id,
      name: photographer.name,
      email: photographer.email,
      emailVerified: photographer.emailVerified,
    }));
    expect(response.body).toEqual(expectedPhotographers);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(SEED_PHOTOGRAPHERS.length);
  });

  it("should return 401 if not authenticated when getting all photographers", async () => {
    const response = await request(app).get("/photographer/all");
    expect(response.status).toBe(401);
  })

  it("should return 403 if not administrator when getting all photographers", async () => {
    const token = tokenService.generateAccessToken({
        sub: "1",
        email: "ana.costa@luzestudio.fake",
    })
    const response = await request(app).get("/photographer/all").set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(403);
  })

  it("should create a new photographer", async () => {
    const requestBody = {
        name: "John Doe",
        email: "delivered@resend.dev",
        password: "123456",
        phoneNumber: "11910908312",
        studioName: "John Doe Studio",
    }
    const response = await request(app).post("/photographer/create").send(requestBody);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
        id: expect.any(String),
        name: "John Doe",
        email: "delivered@resend.dev",
        phoneNumber: "11910908312",
        studioName: "John Doe Studio",
        isActive: true,
        emailVerified: false,
    });
  })

  it("should return 409 if email already exists when creating a new photographer", async () => {
    const requestBody = {
        name: "John Doe",
        email: "ana.costa@luzestudio.fake",
        password: "123456",
        phoneNumber: "11910904735",
        studioName: "John Doe Studio",
    }
    const response = await request(app).post("/photographer/create").send(requestBody);
    expect(response.status).toBe(409);
  })

  it("should update a photographer", async () => {
    const token = tokenService.generateAccessToken({
        sub: "1",
        email: "ana.costa@luzestudio.fake",
    })
    const requestBody = {
        name: "Ana Maria",
        email: "ana.costa@luzestudio.fake",
        phoneNumber: "11910904765",
        studioName: "Atuação Fotografia",
    }
    const response = await request(app)
        .put("/photographer/me")
        .set("Authorization", `Bearer ${token}`)
        .send(requestBody);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({...requestBody, profilePictureUrl: null});
  })

  it("should delete a photographer", async () => {
    const response = await request(app).delete("/photographer/1");
    expect(response.status).toBe(204);
  })

  it("should login a photographer", async () => {
    const requestBody = {
        email: "ana.costa@luzestudio.fake",
        password: "Test@123",
    }
    const response = await request(app).post("/photographer/login").send(requestBody);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
    });
  })

  it("should return 400 if email is not valid", async () => {
    const requestBody = {
        email: "john.doeexample.com",
        password: "123456",
    }
    const response = await request(app).post("/photographer/login").send(requestBody);
    expect(response.status).toBe(400);
  })

  it("should return 404 if email not found", async () => {
    const requestBody = {
        email: "john.doe@example.com",
        password: "Test@123",
    }
    const response = await request(app).post("/photographer/login").send(requestBody);
    expect(response.status).toBe(404);
  })
});
