import Card from "./Card";


function App() {
  return (
    <div className="App">
      <section className="section section-gray">
        <div className="container">
          <h1 className="section-title">Acesso à Informação</h1>
          <p className="section-subtitle">
            Veja dados de transparência e governança
          </p>

          {/* Renderizando vários cards iguais */}
          <div className="card-grid">
            <Card />

          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
