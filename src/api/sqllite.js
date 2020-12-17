import * as SQLite from 'expo-sqlite';


class Sql {
  db = SQLite.openDatabase("kantemba.db");
}

export default Sql;