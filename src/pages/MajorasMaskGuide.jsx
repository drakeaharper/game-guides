import { useState, useEffect } from 'react'
import './MajorasMaskGuide.css'

// Masks ordered by typical acquisition order in the game
const masks = [
  // Early Game - Clock Town & Southern Swamp
  { id: 'deku', name: 'Deku Mask', category: 'Transformation' },
  { id: 'great-fairy', name: 'Great Fairy Mask', category: 'Regular' },
  { id: 'blast', name: 'Blast Mask', category: 'Regular' },
  { id: 'bremen', name: 'Bremen Mask', category: 'Regular' },
  { id: 'kamaro', name: "Kamaro's Mask", category: 'Regular' },
  { id: 'kafei', name: "Kafei's Mask", category: 'Regular' },
  { id: 'mask-of-truth', name: 'Mask of Truth', category: 'Regular' },
  { id: 'mask-of-scents', name: 'Mask of Scents', category: 'Regular' },

  // Mountain Village & Snowhead
  { id: 'goron', name: 'Goron Mask', category: 'Transformation' },
  { id: 'bunny', name: 'Bunny Hood', category: 'Regular' },
  { id: 'don-gero', name: "Don Gero's Mask", category: 'Regular' },

  // Great Bay Coast
  { id: 'zora', name: 'Zora Mask', category: 'Transformation' },
  { id: 'romani', name: "Romani's Mask", category: 'Regular' },
  { id: 'circus', name: "Circus Leader's Mask", category: 'Regular' },

  // Ikana Canyon
  { id: 'garo', name: "Garo's Mask", category: 'Regular' },
  { id: 'stone', name: 'Stone Mask', category: 'Regular' },
  { id: 'gibdo', name: 'Gibdo Mask', category: 'Regular' },
  { id: 'captain', name: "Captain's Hat", category: 'Regular' },
  { id: 'giant', name: "Giant's Mask", category: 'Regular' },

  // Late Game - Side Quests
  { id: 'keaton', name: 'Keaton Mask', category: 'Regular' },
  { id: 'couple', name: "Couple's Mask", category: 'Regular' },
  { id: 'postman', name: "Postman's Hat", category: 'Regular' },
  { id: 'all-night', name: 'All-Night Mask', category: 'Regular' },

  // Final Reward
  { id: 'fierce-deity', name: "Fierce Deity's Mask", category: 'Transformation' },
]

function MajorasMaskGuide({ onBack }) {
  const [collectedMasks, setCollectedMasks] = useState(() => {
    const saved = localStorage.getItem('majoras-mask-collected')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('majoras-mask-collected', JSON.stringify(collectedMasks))
  }, [collectedMasks])

  const toggleMask = (maskId) => {
    setCollectedMasks(prev =>
      prev.includes(maskId)
        ? prev.filter(id => id !== maskId)
        : [...prev, maskId]
    )
  }

  // Group masks by game progression
  const earlyGame = masks.slice(0, 8)  // Deku through Mask of Scents
  const snowhead = masks.slice(8, 11)  // Goron, Bunny Hood, Don Gero
  const greatBay = masks.slice(11, 14)  // Zora, Romani's, Circus Leader's
  const ikana = masks.slice(14, 19)  // Garo through Giant's
  const lateGame = masks.slice(19, 23)  // Keaton through All-Night
  const finalReward = masks.slice(23)  // Fierce Deity

  const collectedCount = collectedMasks.length
  const totalCount = masks.length

  const renderMaskList = (maskList) => (
    <div className="masks-list">
      {maskList.map(mask => (
        <label key={mask.id} className="mask-item">
          <input
            type="checkbox"
            checked={collectedMasks.includes(mask.id)}
            onChange={() => toggleMask(mask.id)}
          />
          <span className={collectedMasks.includes(mask.id) ? 'collected' : ''}>
            {mask.name}
          </span>
        </label>
      ))}
    </div>
  )

  return (
    <div className="guide">
      <header className="guide-header">
        <button onClick={onBack} className="back-btn">← Back to Games</button>
        <h1>The Legend of Zelda: Majora's Mask</h1>
        <h2>Mask Collection Guide</h2>
        <div className="progress">
          <div className="progress-text">
            {collectedCount} / {totalCount} Masks Collected
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(collectedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>
      </header>

      <div className="masks-section">
        <h3>🏙️ Early Game - Clock Town & Southern Swamp</h3>
        {renderMaskList(earlyGame)}
      </div>

      <div className="masks-section">
        <h3>❄️ Mountain Village & Snowhead</h3>
        {renderMaskList(snowhead)}
      </div>

      <div className="masks-section">
        <h3>🌊 Great Bay Coast</h3>
        {renderMaskList(greatBay)}
      </div>

      <div className="masks-section">
        <h3>💀 Ikana Canyon</h3>
        {renderMaskList(ikana)}
      </div>

      <div className="masks-section">
        <h3>⭐ Late Game - Side Quests</h3>
        {renderMaskList(lateGame)}
      </div>

      <div className="masks-section">
        <h3>👹 Final Reward</h3>
        {renderMaskList(finalReward)}
      </div>

      <div className="guide-footer">
        <p>
          For detailed information on how to obtain each mask, check the{' '}
          <a
            href="https://github.com/drakeaharper/game-guides/blob/main/guides/majoras-mask/masks-guide.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            complete guide
          </a>
          .
        </p>
        <p className="tip">💡 Your progress is automatically saved in your browser's local storage.</p>
      </div>
    </div>
  )
}

export default MajorasMaskGuide
