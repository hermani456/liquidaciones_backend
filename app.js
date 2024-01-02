require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3000;
const {
  getTrabajador,
  setTrabajador,
  getTrabajadorByRut,
  getNombres,
} = require("./db/queries");

app.use(express.json());
// cors allow all
// app.use(cors({ origin: "*"}));

// app.use(cors({ origin: "https://liquidacionesfrontend-production.up.railway.app/"}));
app.use(cors())

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// auth
app.use((req, res, next) => {
  const auth = { login: process.env.USER_NAME, password: process.env.USER_PASSWORD };
  // parse login and password from headers
  const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
  const [login, password] = Buffer.from(b64auth, "base64")
    .toString()
    .split(":");
  // Verify login and password are set and correct
  if (login && password && login === auth.login && password === auth.password) {
    // Access granted...
    return next();
  }
  // Access denied...
  res.set("WWW-Authenticate", 'Basic realm="401"'); // change this
  res.status(401).send("Authentication required."); // custom message
}
);

app.get("/api/trabajador", async (req, res) => {
  const trabajadores = await getTrabajador();
  res.json(trabajadores);
});

app.get("/api/trabajador/:rut", async (req, res) => {
  const { rut } = req.params;
  const trabajador = await getTrabajadorByRut(rut);
  res.json(trabajador);
});

app.post("/api/trabajador", async (req, res) => {
  const trabajador = await getTrabajadorByRut(req.body.rut);
  const rutTrabajador = trabajador[0]?.rut;
  if (rutTrabajador === req.body.rut) {
    res.status(400).json({ error: "Trabajador ya existe" });
  } else {
    const trabajador = await setTrabajador(
      req.body.nombre,
      req.body.apellido,
      req.body.rut,
      req.body.direccion,
      req.body.email,
      req.body.afp,
      req.body.salud,
      req.body.cargo,
      req.body.sueldo_base
    );
    res.json(trabajador);
  }
});

app.get("/api/trabajador/nombres", async (req, res) => {
  const nombres = await getNombres();
  res.json(nombres);
})


// const getAlgo = async () => {
//   const response = await getTrabajador()
//   console.log(response)
// }

// console.log(getAlgo())

app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`);
});
