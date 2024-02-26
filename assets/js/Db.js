/* Banco de Dados*/

alasql('CREATE localStorage DATABASE IF NOT EXISTS dbagrosys');
alasql('ATTACH localStorage DATABASE dbagrosys');
alasql('USE dbagrosys');
alasql("CREATE TABLE IF NOT EXISTS login (id INT IDENTITY(1,1), name string, password string)");
alasql("CREATE TABLE IF NOT EXISTS clientes (id INT IDENTITY(1,1),name string, cpf string, date string, fone string, cel string, principal string)");
alasql("CREATE TABLE IF NOT EXISTS enderecos (id INT IDENTITY(1,1),cep string, rua string, bairro string, cidade string, estado string, pais string, principal string,idcliente int)");

var result = alasql('SELECT * FROM login');

if (result.length == 0) {
    alasql(" INSERT INTO login (id, name, password) VALUES ('','admin','123456')");
}

var result = alasql('SELECT * FROM clientes');

if (result.length == 0) {
    alasql("INSERT INTO clientes (id, name, cpf, date,fone,cel,principal) VALUES ('1','jose maria','01785236930','1987-01-01','4830456900','48999056688','88802250' )");
    alasql("INSERT INTO enderecos (id ,cep , rua, bairro , cidade , estado , pais , principal, idcliente) VALUES ('1','88802250','Rua','Centro','Cri','SC','Brasil','1','1')");
    alasql("INSERT INTO enderecos (id ,cep , rua, bairro , cidade , estado , pais , principal, idcliente) VALUES ('2','88802250','Rua','Centro','Cri','SC','Brasil','0','1')");
}