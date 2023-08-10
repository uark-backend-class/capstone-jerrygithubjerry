import request from "supertest";
import app from "./app.js";
import cheerio from "cheerio";

test("/login should return a login page", async () => {
    let response = await request(app).get("/login");
    async () => { request(app).get("/login");
    expect((response.statusCode).toBe(200))
}

const $ = cheerio.load(response.text);

// check for username input
const usernameInput = $("input[name='username']");
expect(usernameInput).toHaveLength(1);
expect(usernameInput.attr('type')).toBe('text');

// check for password input
const passwordInput = $("input[name='password']");
expect(passwordInput).toHaveLength(1);
expect(passwordInput.attr('type')).toBe('password');

});


test("/ should redirect to the login page", async () => {
    let response = await request(app).get("/");
    expect(response.statusCode).toBe(302);
    expect(response.header.location).toBe("/login");

});

describe("Protected routes", () => {
    const agent = request.agent(app);

    beforeAll(async () => {
        const response = await agent.post("/login")
            .type("form")
            .send({ 
                username: "test", 
                password: "abc123" })
            .expect(302);
            expect(response.header.location).toBe("/appointments/hygienist");
    });

    test("should allow access to /appointments/hygienist after auth", async () => {
        const response = await agent.get("/appointments/hygienist");
        
        expect(response.statusCode).toBe(302);
    });
}); 