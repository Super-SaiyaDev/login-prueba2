// App.js
import React from "react";
import { Link } from "react-router-dom";
import "./css/dashboard.css";

function Principal() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Mi Tienda E-commerce</h1>
      </header>
      <main>
        <h2>Productos</h2>
        {/* Aquí puedes mapear tus productos */}
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum
          suscipit voluptas dignissimos, laboriosam amet aut et est molestiae
          tempore reprehenderit quos vitae placeat ea possimus quia earum,
          dolores iste voluptates sapiente? Sit minus obcaecati ipsum delectus!
          Neque minima magni vitae tenetur unde, eius numquam, quasi fugiat
          labore excepturi autem voluptate!
        </p>
        <Link
          style={{
            textDecoration: "none",
            color: "white",
            fontSize: "20px",
            background: "black",
            borderRadius: "5px",
            padding: "10px",
          }}
          to="/login"
        >
          Login
        </Link>
      </main>
      <footer>
        <p>© 2024 Mi Tienda E-commerce</p>
      </footer>
    </div>
  );
}

export default Principal;
