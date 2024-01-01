CREATE TABLE trabajador(
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    rut VARCHAR(12),
    direccion VARCHAR(50),
    email VARCHAR(50),
    afp VARCHAR(50),
    salud VARCHAR(50),
    cargo VARCHAR(50),
    sueldo_base INT,
    fecha_ingreso DATE,
    PRIMARY KEY (rut)
);

INSERT INTO trabajador VALUES ('Juan', 'Perez', '12345678-9', 'Calle 1', 'mail@mail.cl', 'AFP', 'Fonasa', 'Cargo', 1000000);

update trabajador set sueldo_base = 855.536 where rut = '17797462-5'
