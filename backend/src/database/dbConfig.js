require ('dotenv').config()
const { Pool } = require('pg')
const {DB_USER,DB_HOST,DB_PASS,DB_DBASE} = process.env
const database = new Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_DBASE,
    allowExitOnIdle: true
})
const createTables = async () => {
	try {
		const client = await database.connect();

		// Crear tabla "cuenta" solo si no existe
		await client.query(`
            CREATE TABLE IF NOT EXISTS cuenta (
                id_cta SERIAL PRIMARY key,
                tpo_cta VARCHAR,
                UNIQUE (tpo_cta)
            );
        `);

        await client.query(`
            CREATE TABLE IF NOT EXISTS region(
                id_reg INTEGER PRIMARY key,
                region VARCHAR,
                UNIQUE (region)
            );
        `);
    
        await client.query(`
            CREATE TABLE IF NOT EXISTS ciudad(
                id_ciudad INTEGER PRIMARY key,
                id_reg INTEGER,
                ciudad VARCHAR,
                UNIQUE (ciudad),
                CONSTRAINT fk_id_region FOREIGN KEY (id_reg) REFERENCES region (id_reg) ON DELETE CASCADE
            );
        `);
    
        await client.query(`
            CREATE TABLE IF NOT EXISTS comuna(
                id_comuna INTEGER PRIMARY key,
                id_ciudad INTEGER,
                comuna VARCHAR,
                UNIQUE (comuna),
                CONSTRAINT fk_id_ciudad FOREIGN KEY (id_ciudad) REFERENCES ciudad (id_ciudad) ON DELETE CASCADE
            );
        `);
    
        await client.query(`
            CREATE TABLE IF NOT EXISTS categoria(
                id_cat SERIAL PRIMARY key,
                cat_nom VARCHAR,
                UNIQUE (cat_nom)
            );
        `);

        await client.query(`
            CREATE TABLE IF NOT EXISTS banco(
                id_bco SERIAL PRIMARY key,
                bco_nom VARCHAR,
            UNIQUE(bco_nom)
            );
        `);
            
        await client.query(`
            CREATE TABLE IF NOT EXISTS login(
	            per_rut VARCHAR (9) PRIMARY key,
	            lg_pass VARCHAR
            );
        `);
        
        await client.query(`
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
        `);
                    
        await client.query(`
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
                UNIQUE (pro_nom,pro_desc,pro_val,pro_img,pro_cant,pro_like,pro_id_cat,id_per_rut,id_prod),
                CONSTRAINT fk_pro_id_cat FOREIGN KEY (pro_id_cat) REFERENCES categoria (id_cat) ON DELETE CASCADE,
                CONSTRAINT fk_id_per_rut FOREIGN KEY (id_per_rut) REFERENCES perfil (per_rut) ON DELETE CASCADE
            );                
        `);

        await client.query(`
            CREATE TABLE IF NOT EXISTS detalle_venta(
                id_det INTEGER,
                per_rut VARCHAR (9),
                id_prod INTEGER,
                det_cant INTEGER,
                det_total INTEGER,
                CONSTRAINT fk_det_per_rut FOREIGN KEY (per_rut) REFERENCES perfil (per_rut) ON DELETE CASCADE
            );
                
        `);

        await client.query(`
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
        `);
            
		console.log("Tablas creadas si no existían."); 
		client.release();
	} catch (err) {
		console.error(err);
	} 
};

const insertInitialData = async () => {
	try {
		const client = await database.connect();

		await client.query(`
            INSERT INTO cuenta
            VALUES (DEFAULT, 'Cta. Corriente'),
                    (DEFAULT, 'Cta. Vista'),
                    (DEFAULT, 'Cta. Ahorro')
            ON CONFLICT (tpo_cta) DO NOTHING;
    	`);

        await client.query(`
            INSERT INTO region 
            VALUES 	(1,'ARICA Y PARINACOTA'),
				(2,'TARAPACÁ'),
				(3,'ANTOFAGASTA'),
				(4,'ATACAMA'),
				(5,'COQUIMBO'),
				(6,'VALPARAÍSO'),
				(7,'DEL LIBERTADOR GRAL. BERNARDO OHIGGINS'),
				(8,'DEL MAULE'),
				(9,'DEL BIOBÍO'),
				(10,'DE LA ARAUCANÍA'),
				(11,'DE LOS RÍOS'),
				(12,'DE LOS LAGOS'),
				(13,'AISÉN DEL GRAL. CARLOS IBAÑEZ DEL CAMPO'),
				(14,'MAGALLANES Y DE LA ANTÁRTICA CHILENA'),
				(15,'METROPOLITANA DE SANTIAGO')
            ON CONFLICT (region) DO NOTHING;
    	`);

        await client.query(`
            INSERT INTO ciudad VALUES 	(1,1,'ARICA'),
					(2,1,'PARINACOTA'),
					(3,2,'IQUIQUE'),
					(4,2,'TAMARUGAL'),
					(5,3,'ANTOFAGASTA'),
					(6,3,'EL LOA'),
					(7,3,'TOCOPILLA'),
					(8,4,'COPIAPÓ'),
					(9,4,'CHAÑARAL'),
					(10,4,'HUASCO'),
					(11,5,'ELQUI'),
					(12,5,'CHOAPA'),
					(13,5,'LIMARÍ'),
					(14,6,'VALPARAÍSO'),
					(15,6,'ISLA DE PASCUA'),
					(16,6,'LOS ANDES'),
					(17,6,'PETORCA'),
					(18,6,'QUILLOTA'),
					(19,6,'SAN ANTONIO'),
					(20,6,'SAN FELIPE DE ACONCAGUA'),
					(21,6,'MARGA MARGA'),
					(22,7,'CACHAPOAL'),
					(23,7,'CARDENAL CARO'),
					(24,7,'COLCHAGUA'),
					(25,8,'TALCA'),
					(26,8,'CAUQUENES'),
					(27,8,'CURICÓ'),
					(28,8,'LINARES'),
					(29,9,'CONCEPCIÓN'),
					(30,9,'ARAUCO'),
					(31,9,'BIOBÍO'),
					(32,9,'ÑUBLE'),
					(33,10,'CAUTÍN'),
					(34,10,'MALLECO'),
					(35,11,'VALDIVIA'),
					(36,11,'RANCO'),
					(37,12,'LLANQUIHUE'),
					(38,12,'CHILOÉ'),
					(39,12,'OSORNO'),
					(40,12,'PALENA'),
					(41,13,'COIHAIQUE'),
					(42,13,'AISÉN'),
					(43,13,'CAPITÁN PRAT'),
					(44,13,'GENERAL CARRERA'),
					(45,14,'MAGALLANES'),
					(46,14,'ANTÁRTICA CHILENA'),
					(47,14,'TIERRA DEL FUEGO'),
					(48,14,'ULTIMA ESPERANZA'),
					(49,15,'SANTIAGO'),
					(50,15,'CORDILLERA'),
					(51,15,'CHACABUCO'),
					(52,15,'MAIPO'),
					(53,15,'MELIPILLA'),
					(54,15,'TALAGANTE')
            ON CONFLICT (ciudad) DO NOTHING;
        `);

        await client.query(`
            INSERT INTO comuna VALUES 	(1,1,'ARICA'),
				(2,1,'CAMARONES'),
				(3,2,'PUTRE'),
				(4,2,'GENERAL LAGOS'),
				(5,3,'IQUIQUE'),
				(6,3,'ALTO HOSPICIO'),
				(7,4,'POZO ALMONTE'),
				(8,4,'CAMIÑA'),
				(9,4,'COLCHANE'),
				(10,4,'HUARA'),
				(11,4,'PICA'),
				(12,5,'ANTOFAGASTA'),
				(13,5,'MEJILLONES'),
				(14,5,'SIERRA GORDA'),
				(15,5,'TALTAL'),
				(16,6,'CALAMA'),
				(17,6,'OLLAGÜE'),
				(18,6,'SAN PEDRO DE ATACAMA'),
				(19,7,'TOCOPILLA'),
				(20,7,'MARÍA ELENA'),
				(21,8,'COPIAPÓ'),
				(22,8,'CALDERA'),
				(23,8,'TIERRA AMARILLA'),
				(24,9,'CHAÑARAL'),
				(25,9,'DIEGO DE ALMAGRO'),
				(26,10,'VALLENAR'),
				(27,10,'ALTO DEL CARMEN'),
				(28,10,'FREIRINA'),
				(29,10,'HUASCO'),
				(30,11,'LA SERENA'),
				(31,11,'COQUIMBO'),
				(32,11,'ANDACOLLO'),
				(33,11,'LA HIGUERA'),
				(34,11,'PAIGUANO'),
				(35,11,'VICUÑA'),
				(36,12,'ILLAPEL'),
				(37,12,'CANELA'),
				(38,12,'LOS VILOS'),
				(39,12,'SALAMANCA'),
				(40,13,'OVALLE'),
				(41,13,'COMBARBALÁ'),
				(42,13,'MONTE PATRIA'),
				(43,13,'PUNITAQUI'),
				(44,13,'RÍO HURTADO'),
				(45,14,'VALPARAÍSO'),
				(46,14,'CASABLANCA'),
				(47,14,'CONCÓN'),
				(48,14,'JUAN FERNÁNDEZ'),
				(49,14,'PUCHUNCAVÍ'),
				(50,14,'QUINTERO'),
				(51,14,'VIÑA DEL MAR'),
				(52,15,'ISLA DE PASCUA'),
				(53,16,'LOS ANDES'),
				(54,16,'CALLE LARGA'),
				(55,16,'RINCONADA'),
				(56,16,'SAN ESTEBAN'),
				(57,17,'LA LIGUA'),
				(58,17,'CABILDO'),
				(59,17,'PAPUDO'),
				(60,17,'PETORCA'),
				(61,17,'ZAPALLAR'),
				(62,18,'QUILLOTA'),
				(63,18,'CALERA'),
				(64,18,'HIJUELAS'),
				(65,18,'LA CRUZ'),
				(66,18,'NOGALES'),
				(67,19,'SAN ANTONIO'),
				(68,19,'ALGARROBO'),
				(69,19,'CARTAGENA'),
				(70,19,'EL QUISCO'),
				(71,19,'EL TABO'),
				(72,19,'SANTO DOMINGO'),
				(73,20,'SAN FELIPE'),
				(74,20,'CATEMU'),
				(75,20,'LLAILLAY'),
				(76,20,'PANQUEHUE'),
				(77,20,'PUTAENDO'),
				(78,20,'SANTA MARÍA'),
				(79,21,'LIMACHE'),
				(80,21,'QUILPUÉ'),
				(81,21,'VILLA ALEMANA'),
				(82,21,'OLMUÉ'),
				(83,22,'RANCAGUA'),
				(84,22,'CODEGUA'),
				(85,22,'COINCO'),
				(86,22,'COLTAUCO'),
				(87,22,'DOÑIHUE'),
				(88,22,'GRANEROS'),
				(89,22,'LAS CABRAS'),
				(90,22,'MACHALÍ'),
				(91,22,'MALLOA'),
				(92,22,'MOSTAZAL'),
				(93,22,'OLIVAR'),
				(94,22,'PEUMO'),
				(95,22,'PICHIDEGUA'),
				(96,22,'QUINTA DE TILCOCO'),
				(97,22,'RENGO'),
				(98,22,'REQUÍNOA'),
				(99,22,'SAN VICENTE'),
				(100,23,'PICHILEMU'),
				(101,23,'LA ESTRELLA'),
				(102,23,'LITUECHE'),
				(103,23,'MARCHIHUE'),
				(104,23,'NAVIDAD'),
				(105,23,'PAREDONES'),
				(106,24,'SAN FERNANDO'),
				(107,24,'CHÉPICA'),
				(108,24,'CHIMBARONGO'),
				(109,24,'LOLOL'),
				(110,24,'NANCAGUA'),
				(111,24,'PALMILLA'),
				(112,24,'PERALILLO'),
				(113,24,'PLACILLA'),
				(114,24,'PUMANQUE'),
				(115,24,'SANTA CRUZ'),
				(116,25,'TALCA'),
				(117,25,'CONSTITUCIÓN'),
				(118,25,'CUREPTO'),
				(119,25,'EMPEDRADO'),
				(120,25,'MAULE'),
				(121,25,'PELARCO'),
				(122,25,'PENCAHUE'),
				(123,25,'RÍO CLARO'),
				(124,25,'SAN CLEMENTE'),
				(125,25,'SAN RAFAEL'),
				(126,26,'CAUQUENES'),
				(127,26,'CHANCO'),
				(128,26,'PELLUHUE'),
				(129,27,'CURICÓ'),
				(130,27,'HUALAÑÉ'),
				(131,27,'LICANTÉN'),
				(132,27,'MOLINA'),
				(133,27,'RAUCO'),
				(134,27,'ROMERAL'),
				(135,27,'SAGRADA FAMILIA'),
				(136,27,'TENO'),
				(137,27,'VICHUQUÉN'),
				(138,28,'LINARES'),
				(139,28,'COLBÚN'),
				(140,28,'LONGAVÍ'),
				(141,28,'PARRAL'),
				(142,28,'RETIRO'),
				(143,28,'SAN JAVIER'),
				(144,28,'VILLA ALEGRE'),
				(145,28,'YERBAS BUENAS'),
				(146,29,'CONCEPCIÓN'),
				(147,29,'CORONEL'),
				(148,29,'CHIGUAYANTE'),
				(149,29,'FLORIDA'),
				(150,29,'HUALQUI'),
				(151,29,'LOTA'),
				(152,29,'PENCO'),
				(153,29,'SAN PEDRO DE LA PAZ'),
				(154,29,'SANTA JUANA'),
				(155,29,'TALCAHUANO'),
				(156,29,'TOMÉ'),
				(157,29,'HUALPÉN'),
				(158,30,'LEBU'),
				(159,30,'ARAUCO'),
				(160,30,'CAÑETE'),
				(161,30,'CONTULMO'),
				(162,30,'CURANILAHUE'),
				(163,30,'LOS ALAMOS'),
				(164,30,'TIRÚA'),
				(165,31,'LOS ANGELES'),
				(166,31,'ANTUCO'),
				(167,31,'CABRERO'),
				(168,31,'LAJA'),
				(169,31,'MULCHÉN'),
				(170,31,'NACIMIENTO'),
				(171,31,'NEGRETE'),
				(172,31,'QUILACO'),
				(173,31,'QUILLECO'),
				(174,31,'SAN ROSENDO'),
				(175,31,'SANTA BÁRBARA'),
				(176,31,'TUCAPEL'),
				(177,31,'YUMBEL'),
				(178,31,'ALTO BIOBÍO'),
				(179,32,'CHILLÁN'),
				(180,32,'BULNES'),
				(181,32,'COBQUECURA'),
				(182,32,'COELEMU'),
				(183,32,'COIHUECO'),
				(184,32,'CHILLÁN VIEJO'),
				(185,32,'EL CARMEN'),
				(186,32,'NINHUE'),
				(187,32,'ÑIQUÉN'),
				(188,32,'PEMUCO'),
				(189,32,'PINTO'),
				(190,32,'PORTEZUELO'),
				(191,32,'QUILLÓN'),
				(192,32,'QUIRIHUE'),
				(193,32,'RÁNQUIL'),
				(194,32,'SAN CARLOS'),
				(195,32,'SAN FABIÁN'),
				(196,32,'SAN IGNACIO'),
				(197,32,'SAN NICOLÁS'),
				(198,32,'TREGUACO'),
				(199,32,'YUNGAY'),
				(200,33,'TEMUCO'),
				(201,33,'CARAHUE'),
				(202,33,'CUNCO'),
				(203,33,'CURARREHUE'),
				(204,33,'FREIRE'),
				(205,33,'GALVARINO'),
				(206,33,'GORBEA'),
				(207,33,'LAUTARO'),
				(208,33,'LONCOCHE'),
				(209,33,'MELIPEUCO'),
				(210,33,'NUEVA IMPERIAL'),
				(211,33,'PADRE LAS CASAS'),
				(212,33,'PERQUENCO'),
				(213,33,'PITRUFQUÉN'),
				(214,33,'PUCÓN'),
				(215,33,'SAAVEDRA'),
				(216,33,'TEODORO SCHMIDT'),
				(217,33,'TOLTÉN'),
				(218,33,'VILCÚN'),
				(219,33,'VILLARRICA'),
				(220,33,'CHOLCHOL'),
				(221,34,'ANGOL'),
				(222,34,'COLLIPULLI'),
				(223,34,'CURACAUTÍN'),
				(224,34,'ERCILLA'),
				(225,34,'LONQUIMAY'),
				(226,34,'LOS SAUCES'),
				(227,34,'LUMACO'),
				(228,34,'PURÉN'),
				(229,34,'RENAICO'),
				(230,34,'TRAIGUÉN'),
				(231,34,'VICTORIA'),
				(232,35,'VALDIVIA'),
				(233,35,'CORRAL'),
				(234,35,'LANCO'),
				(235,35,'LOS LAGOS'),
				(236,35,'MÁFIL'),
				(237,35,'MARIQUINA'),
				(238,35,'PAILLACO'),
				(239,35,'PANGUIPULLI'),
				(240,36,'LA UNIÓN'),
				(241,36,'FUTRONO'),
				(242,36,'LAGO RANCO'),
				(243,36,'RÍO BUENO'),
				(244,37,'PUERTO MONTT'),
				(245,37,'CALBUCO'),
				(246,37,'COCHAMÓ'),
				(247,37,'FRESIA'),
				(248,37,'FRUTILLAR'),
				(249,37,'LOS MUERMOS'),
				(250,37,'LLANQUIHUE'),
				(251,37,'MAULLÍN'),
				(252,37,'PUERTO VARAS'),
				(253,38,'CASTRO'),
				(254,38,'ANCUD'),
				(255,38,'CHONCHI'),
				(256,38,'CURACO DE VÉLEZ'),
				(257,38,'DALCAHUE'),
				(258,38,'PUQUELDÓN'),
				(259,38,'QUEILÉN'),
				(260,38,'QUELLÓN'),
				(261,38,'QUEMCHI'),
				(262,38,'QUINCHAO'),
				(263,39,'OSORNO'),
				(264,39,'PUERTO OCTAY'),
				(265,39,'PURRANQUE'),
				(266,39,'PUYEHUE'),
				(267,39,'RÍO NEGRO'),
				(268,39,'SAN JUAN DE LA COSTA'),
				(269,39,'SAN PABLO'),
				(270,40,'CHAITÉN'),
				(271,40,'FUTALEUFÚ'),
				(272,40,'HUALAIHUÉ'),
				(273,40,'PALENA'),
				(274,41,'COIHAIQUE'),
				(275,41,'LAGO VERDE'),
				(276,42,'AISÉN'),
				(277,42,'CISNES'),
				(278,42,'GUAITECAS'),
				(279,43,'COCHRANE'),
				(280,43,'OHIGGINS'),
				(281,43,'TORTEL'),
				(282,44,'CHILE CHICO'),
				(283,44,'RÍO IBÁÑEZ'),
				(284,45,'PUNTA ARENAS'),
				(285,45,'LAGUNA BLANCA'),
				(286,45,'RÍO VERDE'),
				(287,45,'SAN GREGORIO'),
				(288,46,'CABO DE HORNOS'),
				(289,46,'ANTÁRTICA'),
				(290,47,'PORVENIR'),
				(291,47,'PRIMAVERA'),
				(292,47,'TIMAUKEL'),
				(293,48,'NATALES'),
				(294,48,'TORRES DEL PAINE'),
				(295,49,'SANTIAGO'),
				(296,49,'CERRILLOS'),
				(297,49,'CERRO NAVIA'),
				(298,49,'CONCHALÍ'),
				(299,49,'EL BOSQUE'),
				(300,49,'ESTACIÓN CENTRAL'),
				(301,49,'HUECHURABA'),
				(302,49,'INDEPENDENCIA'),
				(303,49,'LA CISTERNA'),
				(304,49,'LA FLORIDA'),
				(305,49,'LA GRANJA'),
				(306,49,'LA PINTANA'),
				(307,49,'LA REINA'),
				(308,49,'LAS CONDES'),
				(309,49,'LO BARNECHEA'),
				(310,49,'LO ESPEJO'),
				(311,49,'LO PRADO'),
				(312,49,'MACUL'),
				(313,49,'MAIPÚ'),
				(314,49,'ÑUÑOA'),
				(315,49,'PEDRO AGUIRRE CERDA'),
				(316,49,'PEÑALOLÉN'),
				(317,49,'PROVIDENCIA'),
				(318,49,'PUDAHUEL'),
				(319,49,'QUILICURA'),
				(320,49,'QUINTA NORMAL'),
				(321,49,'RECOLETA'),
				(322,49,'RENCA'),
				(323,49,'SAN JOAQUÍN'),
				(324,49,'SAN MIGUEL'),
				(325,49,'SAN RAMÓN'),
				(326,49,'VITACURA'),
				(327,50,'PUENTE ALTO'),
				(328,50,'PIRQUE'),
				(329,50,'SAN JOSÉ DE MAIPO'),
				(330,51,'COLINA'),
				(331,51,'LAMPA'),
				(332,51,'TILTIL'),
				(333,52,'SAN BERNARDO'),
				(334,52,'BUIN'),
				(335,52,'CALERA DE TANGO'),
				(336,52,'PAINE'),
				(337,53,'MELIPILLA'),
				(338,53,'ALHUÉ'),
				(339,53,'CURACAVÍ'),
				(340,53,'MARÍA PINTO'),
				(341,53,'SAN PEDRO'),
				(342,54,'TALAGANTE'),
				(343,54,'EL MONTE'),
				(344,54,'ISLA DE MAIPO'),
				(345,54,'PADRE HURTADO'),
				(346,54,'PEÑAFLOR')
            ON CONFLICT (comuna) DO NOTHING;
        `);

        await client.query(`
            INSERT INTO categoria VALUES (DEFAULT, 'Belleza'),
                (DEFAULT,'Deportes'),
                (DEFAULT,'Electricos'),
                (DEFAULT,'Juguetes'),
                (DEFAULT,'Consolas'),
                (DEFAULT,'Hentai'),
                (DEFAULT,'Automotriz'),
                (DEFAULT,'Moda')
            ON CONFLICT (cat_nom) DO NOTHING;
        `);

        await client.query(`
            INSERT INTO banco VALUES (DEFAULT,'Banco de Chile, Banco Edwards, Citi, Atlas y CrediChile'),
                (DEFAULT,'Banco Internacional'),
                (DEFAULT,'Scotia'),
                (DEFAULT,'Banco de crédito e inversiones'),
                (DEFAULT,'Banco BICE'),
                (DEFAULT,'HSBC Chile'),
                (DEFAULT,'Banco Santander (también Banefe)'),
                (DEFAULT,'Itaú Corpbanca'),
                (DEFAULT,'Banco Security'),
                (DEFAULT,'Banco Falabella'),
                (DEFAULT,'Banco Ripley'),
                (DEFAULT,'Banco Consorcio'),
                (DEFAULT,'Banco BTG Pactual'),
                (DEFAULT,'BancoEstado'),
                (DEFAULT,'JP Morgan Chase Bank'),
                (DEFAULT,'China Construction'),
                (DEFAULT,'Bank of China'),
                (DEFAULT,'Tapp'),
                (DEFAULT,'Match'),
                (DEFAULT,'Tempo'),
                (DEFAULT,'Mercado Pago')
            ON CONFLICT (bco_nom) DO NOTHING;
        `);
    
        await client.query(`

        `);
                
        await client.query(`
                
        `);
            
        await client.query(`
        
        `);
                        
        await client.query(`
                        
        `);
        
		console.log("Datos iniciales insertados si no existían.");
		client.release();
	} catch (err) {
		console.error(err);
	}
};
const initDatabase = async () => {
    await createTables(); 
    await insertInitialData(); 
}
module.exports = {initDatabase, database};