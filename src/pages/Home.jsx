import './Home.css'

function Home({ onNavigate }) {
  const games = [
    {
      id: 'majoras-mask',
      title: "The Legend of Zelda: Majora's Mask",
      description: 'Complete mask collection guide with tracking',
      image: '🎭'
    }
  ]

  return (
    <div className="home">
      <header className="home-header">
        <h1>Game Guides</h1>
        <p>Your personal collection of video game guides</p>
      </header>

      <div className="games-grid">
        {games.map(game => (
          <div
            key={game.id}
            className="game-card"
            onClick={() => onNavigate(game.id)}
          >
            <div className="game-icon">{game.image}</div>
            <h2>{game.title}</h2>
            <p>{game.description}</p>
            <button className="view-guide-btn">View Guide →</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
