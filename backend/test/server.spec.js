const request = require("supertest")
const server = require("../src/app");

describe("Operaciones CRUD de Micar", () => {

  it("1.- Testea que la ruta GET / obtiene los productod de tienda status code 200.", async () => {
    const response = await request(server).get("/").send();
    const status = response.statusCode;
    expect(status).toBe(200);
  });

  it("2.- Prueba que la ruta POST /login, entrega un status 200 y en el playload el token.", async () => {
    const auth = { rut:"126643675", password:"admin" }
    const response = await request(server).post("/login").send(auth)
    console.log(response)
    const status = response.statusCode
    expect(status).toBe(200)
  })

  it("3.- Prueba que la ruta POST /login un usuario no tiene credencial y entrega un status.", async () => {
    const login = { rut:"153357943", password:"adminum" }
    const response = await request(server).post("/login").send(login)
    console.log(response)
    const status = response.statusCode
    expect(status).toBe(500)
  })

  it("4.- Prueba que la ruta Get /actualizar busca un producto ingresado por el usuario, pero no tiene producto por lo que debe responder un status 201.", async () => {
    const id ="126643675"
    const response = await request(server).get(`/actualizar?id=${id}`).send()
    const status = response.statusCode
    expect(status).toBe(201)
  })
});