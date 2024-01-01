const pool = require("./db");

const getTrabajador = async () => {
  const response = await pool.query("SELECT * FROM trabajador");
  return response.rows;
};

const setTrabajador = async (
  nombre,
  apellido,
  rut,
  direccion,
  email,
  afp,
  salud,
  cargo,
  sueldo
) => {
  const response = await pool.query(
    "INSERT INTO trabajador (nombre, apellido, rut, direccion, email, afp, salud, cargo, sueldo_base) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
    [nombre, apellido, rut, direccion, email, afp, salud, cargo, sueldo]
  );
  return response.rows;
};

const getTrabajadorByRut = async (rut) => {
  const response = await pool.query("SELECT * FROM trabajador WHERE rut = $1", [
    rut,
  ]);
  return response.rows;
}

const getNombres = async () => {
  const response = await pool.query("SELECT nombre FROM trabajador");
  return response.rows;
}

// getTrabajador().then((trabajadores) => console.log(trabajadores));

// setTrabajador('Juan', 'Perez', '12345678-0', 'Calle 123', 'mail@mail.cl', 'AFP', 'Salud', 'Cargo', 1000000)

module.exports = { getTrabajador, setTrabajador, getTrabajadorByRut, getNombres };