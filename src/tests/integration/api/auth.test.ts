import { buildApp } from "../../../api/app";
import request from "supertest";
import { describe, it, expect } from "vitest";
import { JwtTokenService } from "../../../infra/adapters/jwt-token-service";
import jwt from "jsonwebtoken";

describe("Auth API", () => {
  const app = buildApp();
  const tokenService = new JwtTokenService();

  it("should refresh access token with a valid refresh token", async () => {
    const refreshToken = tokenService.generateRefreshToken({
      sub: "1",
      email: "ana.costa@luzestudio.fake",
    });

    const response = await request(app)
      .post("/auth/refresh")
      .send({ refreshToken });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      accessToken: expect.any(String),
    });

    const decoded = tokenService.verifyToken(response.body.accessToken);
    expect(decoded.sub).toBe("1");
    expect(decoded.email).toBe("ana.costa@luzestudio.fake");
  });

  it("should return 401 if refresh token is invalid", async () => {
    const response = await request(app)
      .post("/auth/refresh")
      .send({ refreshToken: "invalid-token" });

    expect(response.status).toBe(401);
  });

  it("should return 401 if an access token is sent instead of a refresh token", async () => {
    const accessToken = tokenService.generateAccessToken({
      sub: "1",
      email: "ana.costa@luzestudio.fake",
    });

    const response = await request(app)
      .post("/auth/refresh")
      .send({ refreshToken: accessToken });

    expect(response.status).toBe(401);
  });

  it("should return 401 if refresh token is expired", async () => {
    const expiredRefreshToken = jwt.sign(
      { sub: "1", email: "ana.costa@luzestudio.fake" },
      process.env.JWT_REFRESH_SECRET_KEY as string,
      { expiresIn: "-1s" },
    );

    const response = await request(app)
      .post("/auth/refresh")
      .send({ refreshToken: expiredRefreshToken });

    expect(response.status).toBe(401);
  });

  it("should return 400 if refreshToken is missing", async () => {
    const response = await request(app).post("/auth/refresh").send({});

    expect(response.status).toBe(400);
  });
});
