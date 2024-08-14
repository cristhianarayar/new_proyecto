require ('dotenv').config()
const { Pool } = require('pg') 
//const { init } = require('../app');

const {DB_USER,DB_HOST,DB_PASS,DB_DBASE} = process.env

const database = new Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_DBASE,
    allowExitOnIdle: true  
})

database.connect(function(error){
    if(error){
        throw error
    }else{
        console.log('Connecting Database')
    }
})

const initDatabase = () => {
    return`
	CREATE TABLE IF NOT EXISTS login(
        per_rut VARCHAR (9) PRIMARY key,
        lg_pass VARCHAR
    );

	CREATE TABLE IF NOT EXISTS region(
	id_reg INTEGER PRIMARY key,
	region VARCHAR
    );

	CREATE TABLE IF NOT EXISTS ciudad(
	id_ciudad INTEGER PRIMARY key,
	id_reg INTEGER,
	ciudad VARCHAR,
	CONSTRAINT fk_id_region FOREIGN KEY (id_reg) REFERENCES region (id_reg) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS comuna(
	id_comuna INTEGER PRIMARY key,
	id_ciudad INTEGER,
	comuna VARCHAR,
	CONSTRAINT fk_id_ciudad FOREIGN KEY (id_ciudad) REFERENCES ciudad (id_ciudad) ON DELETE CASCADE
    );

	CREATE TABLE IF NOT EXISTS categoria(
	id_cat SERIAL PRIMARY key,
	cat_nom VARCHAR
    );

    CREATE TABLE IF NOT EXISTS banco(
	id_bco SERIAL PRIMARY key,
	bco_nom VARCHAR
    );

    CREATE TABLE IF NOT EXISTS cuenta( 
	id_cta SERIAL PRIMARY key,
	tpo_cta VARCHAR
    );

    CREATE TABLE IF NOT EXISTS perfil(
	id_per SERIAL PRIMARY key,
	per_rut VARCHAR (9) UNIQUE,
	per_nom VARCHAR,
	per_ape VARCHAR,
	per_edad INTEGER,
	per_fono INTEGER, 
	per_correo VARCHAR,
	per_id_region INTEGER,
	per_id_comuna INTEGER,
	per_id_ciudad INTEGER,
	per_direc VARCHAR,
	per_url VARCHAR,
	CONSTRAINT fk_per_rut FOREIGN KEY (per_rut) REFERENCES login (per_rut) ON DELETE CASCADE,
	CONSTRAINT fk_per_id_region FOREIGN KEY (per_id_region) REFERENCES region (id_reg) ON DELETE CASCADE,
	CONSTRAINT fk_per_id_comuna FOREIGN KEY (per_id_comuna) REFERENCES comuna (id_comuna) ON DELETE CASCADE,
	CONSTRAINT fk_per_id_ciudad FOREIGN KEY (per_id_ciudad) REFERENCES ciudad (id_ciudad) ON DELETE CASCADE
    );

	CREATE TABLE IF NOT EXISTS producto(
	id_prod SERIAL PRIMARY key,
	id_per_rut VARCHAR (9),
	pro_nom VARCHAR,
	pro_id_cat INTEGER,
	pro_desc VARCHAR,
	pro_cant INTEGER,
	pro_val INTEGER,
	pro_img VARCHAR,
	pro_like INTEGER,
	CONSTRAINT fk_pro_id_cat FOREIGN KEY (pro_id_cat) REFERENCES categoria (id_cat) ON DELETE CASCADE,
	CONSTRAINT fk_id_per_rut FOREIGN KEY (id_per_rut) REFERENCES perfil (per_rut) ON DELETE CASCADE
    );

	CREATE TABLE IF NOT EXISTS detalle_venta(
	id_det INTEGER,
	per_rut VARCHAR (9),
	id_prod INTEGER,
	det_cant INTEGER,
	det_total INTEGER,
	CONSTRAINT fk_det_per_rut FOREIGN KEY (per_rut) REFERENCES perfil (per_rut) ON DELETE CASCADE
    );

	CREATE TABLE IF NOT EXISTS ventas(
	id_ventas SERIAL PRIMARY key,
	id_det INTEGER,
	id_reg_ven INTEGER,
	id_com_ven INTEGER,
	id_ciu_ven INTEGER,
	vent_dir VARCHAR,
	id_bco INTEGER,
	id_cta INTEGER,
	ven_tot INTEGER,
	ven_numcta VARCHAR,
	CONSTRAINT fk_id_reg_ven FOREIGN KEY (id_reg_ven) REFERENCES region (id_reg) ON DELETE CASCADE,
	CONSTRAINT fk_id_com_ven FOREIGN KEY (id_com_ven) REFERENCES comuna (id_comuna) ON DELETE CASCADE,
	CONSTRAINT fk_id_ciu_ven FOREIGN KEY (id_ciu_ven) REFERENCES ciudad (id_ciudad) ON DELETE CASCADE,
	CONSTRAINT fk_id_bco FOREIGN KEY (id_bco) REFERENCES banco (id_bco) ON DELETE CASCADE,
	CONSTRAINT fk_id_cta FOREIGN KEY (id_cta) REFERENCES cuenta (id_cta) ON DELETE CASCADE
    );

	`;
}
// dsource.end()
module.exports = {initDatabase, database};