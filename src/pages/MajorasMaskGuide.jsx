import { useState, useEffect } from 'react'
import './MajorasMaskGuide.css'

// Masks ordered by typical acquisition order in the game
const masks = [
  // Early Game - Clock Town & Southern Swamp
  {
    id: 'deku',
    name: 'Deku Mask',
    category: 'Transformation',
    location: 'Clock Town',
    uses: 'Transform into a Deku Scrub. Allows you to hop on water (5 times), shoot bubbles, use Deku Flowers to fly, and fit through small spaces.',
    howToGet: 'Obtained from the Happy Mask Salesman after learning the "Song of Healing" at the beginning of the game.'
  },
  {
    id: 'great-fairy',
    name: "Great Fairy's Mask",
    location: 'Clock Town, Great Fairy Fountain',
    uses: 'Wearing the Great Fairy Mask will cause wayward Stray Fairies to travel towards you. When worn in dungeons, the mask\'s hair will glow when a Stray Fairy is present somewhere in the room. In the 3DS version the mask will make a chime sound and attract Stray Fairies that are not trapped in bubbles or otherwise obstructed.',
    howToGet: 'Return the lost fairy to the Great Fairy Fountain in North Clocktown. You can find the Stray Fairy either in the Laundry Pool during the day, or by the Stock Pot Inn at night. For the latter, you may have to use the Deku flower to reach it.'
  },
  {
    id: 'blast',
    name: 'Blast Mask',
    location: 'North Clock Town (Night)',
    uses: 'When worn, press B to detonate the bomb on your face. Doing so will cause you to lose one heart per blast, unless you are crouching with your shield out. Shielding while Z/L Targeting will disable the Blast Mask\'s detonation.',
    howToGet: 'Save the Old Lady from the Bomb Shop on the First Night at Midnight in North Clocktown. Sakon the thief is going to try to steal the bombs from her. Slash him to save the bombs and the lady will reward you (shooting him with your bow causes him to explode).'
  },
  {
    id: 'bremen',
    name: 'Bremen Mask',
    location: 'Clock Town, Laundry Pool',
    uses: 'When worn, press B to initiate a march using the Ocarina to cause small animals to follow behind you. Needed to obtain the Bunny Hood. The Bremen Mask can also be used to make the Ikana Warriors march behind you during battle.',
    howToGet: 'Link receives this mask from Guru-Guru, the musician with the Gorman Troupe, in the Laundry Pool area of South Clocktown at night during the first or second nights. Just go to the Laundry Pool in Clock Town and talk to the guy about his problems and you will receive the mask. Note: Guru-Guru only gives you this mask if you are in human form.'
  },
  {
    id: 'kamaro',
    name: "Kamaro's Mask",
    location: 'North Termina Field (Night)',
    uses: 'When worn, press B to engage in a stylish dance, needed for obtaining a Heart Piece from the Rosa Sisters.',
    howToGet: 'Go to Northern Termina at night. You\'ll see him dancing between 12:00 AM and 6:00 AM on a giant mushroom rock. He will tell you he is regretful. Play the Song of Healing for him to free his spirit. He will then give you Kamaro\'s Mask to spread his dance.'
  },
  {
    id: 'kafei',
    name: "Kafei's Mask",
    location: 'East Clock Town, Mayor\'s Office',
    uses: 'When speaking to townsfolk with Kafei\'s Mask, it serves as an information gatherer, prompting people to tell you what they know of the missing man, Kafei.',
    howToGet: 'In order to obtain Kafei\'s Mask, speak to Kafei\'s mother in the Mayor\'s House, through the door on the right, in East Clocktown. By agreeing to help search for the missing Kafei, she will give you the mask.'
  },
  {
    id: 'mask-of-truth',
    name: 'Mask of Truth',
    location: 'Southern Swamp, Skulltulla Dungeon',
    uses: 'Allows the wearer to speak to the Sheikah Stones found in various areas of Termina. Can also read the inner thoughts of beasts like dogs, and can help you pick the right dog for the doggy race.',
    howToGet: 'Complete the first Skulltula Dungeon in the Southern Swamp by defeating all Gold Skulltulas.'
  },
  {
    id: 'mask-of-scents',
    name: 'Mask of Scents',
    location: 'Southern Swamp, Deku Palace Entrance',
    uses: 'Using this mask will help you detect scents by coloring their odors in a visible manner. This can be used to help make Kotake\'s Blue Potions by finding the right mushrooms, or detecting other... pungent stenches.',
    howToGet: 'Finish the Woodfall Temple and rescue the Deku Princess who is right behind you after you defeat Odolwa. Carry her using an empty bottle and take her to the Deku Palace. Afterwards, exit the Deku Palace and turn to the right (Left if you are facing the Deku Palace). Use the Deku Mask to get to the little cave. There you will find the Deku Butler, and you will have to race him to get the mask. Having the Bunny Hood would make things easier. Once you finish the race, the Butler will give you the Mask of Scents.'
  },

  // Mountain Village & Snowhead
  {
    id: 'goron',
    name: 'Goron Mask',
    category: 'Transformation',
    location: 'Mountain Village, Goron Graveyard',
    uses: 'Transform into a Goron. Grants super strength (can break boulders), roll at high speeds, pound the ground with spikes, and immunity to lava and hot environments.',
    howToGet: 'Requires Hero\'s Bow and Lens of Truth to access Mountain Village. Play the Song of Healing for Darmani\'s spirit at his grave in the Goron Graveyard.'
  },
  {
    id: 'bunny',
    name: 'Bunny Hood',
    location: 'Romani Ranch, Cucco Farm',
    uses: 'When worn, Link will run much faster and jump for farther distances. The bunny hood will also let you see hidden timers like the one used in the Postman\'s minigame.',
    howToGet: 'Once you have obtained the Bremen Mask, go to Romani\'s Ranch any day. At the bottom of the ranch you will find two houses. Go to the one with the little chicks painted on the walls. With the Bremen Mask equipped, hold B to start marching, walk near every chick you see (10 total), and they will start turning into Roosters. The guy will then gladly give you the Bunny Hood as a reward!'
  },
  {
    id: 'don-gero',
    name: "Don Gero's Mask",
    location: 'Snowhead, Mountain Village',
    uses: 'When worn, allows Link to speak to the five different frogs found around Termina. When all frogs are reunited, Link will earn a Piece of Heart.',
    howToGet: 'Light all the torches in Goron City, then use the Goron roll to destroy the torches on the chandelier. Take the Rock Tenderloin that falls out to the shivering Goron in the Mountain Village.'
  },

  // Great Bay Coast
  {
    id: 'zora',
    name: 'Zora Mask',
    category: 'Transformation',
    location: 'Great Bay Coast',
    uses: 'Transform into a Zora. Allows fast swimming, underwater breathing, boomerang fin attacks, electric barrier shield, and walking on the ocean floor.',
    howToGet: 'Push the floating Zora (Mikau) onto the beach in Great Bay, then play the Song of Healing for him.'
  },
  {
    id: 'romani',
    name: "Romani's Mask",
    location: 'Romani Ranch, Milk Road',
    uses: 'Allows access to the Milk Bar at night in East Clock Town.',
    howToGet: 'You must have completed the Snowhead Temple and acquired the Powder Keg to access Romani Ranch on the first day. Help Romani defend the Ranch from "Them" (Aliens) at night. After successfully defending the ranch, Romani will give you a bottle of milk. The next day, accompany Cremia on her milk delivery and defend the wagon from the two bandits. After successfully defending it, Cremia will reward you with the Romani\'s Mask.'
  },
  {
    id: 'circus',
    name: "Circus Leader's Mask",
    location: 'East Clock Town, Milk Bar',
    uses: 'When this sad mask is worn, anyone related to the Circus Leader will be overpowered by emotion. You can speak to the Gorman Brothers for some special dialogue, and they will not harm you if worn while defending Cremia\'s Milk Cart.',
    howToGet: 'Go into the Milk Bar in East Clock Town at 10 p.m. (you\'ll need the Romani Mask to enter), and help the Zora with his sound check by playing the instruments while wearing each of your three transformation masks (Deku, Goron, Zora) and as Link. The Circus Leader will be overcome with emotion and present you with the mask.'
  },

  // Ikana Canyon
  {
    id: 'garo',
    name: "Garo's Mask",
    location: 'Gorman Race Track, Milk Road',
    uses: 'When worn, Link can successfully infiltrate Ikana Canyon while posing as a Garo. Garo ninjas will also give you interesting trivia about the area before attacking. Wearing the mask will also cause nearby Redeads to dance.',
    howToGet: 'Go to the Race Track at the Milk Road while riding Epona. When they see your horse, talk to the Gorman Brothers and challenge them to a race. Win and you\'ll get this Mask.'
  },
  {
    id: 'stone',
    name: 'Stone Mask',
    location: 'Ikana Canyon Entrance, Pirate\'s Fortress (3DS)',
    uses: 'When worn, the mask lets Link move unnoticed by many enemies, with the exception of bosses and certain monsters. Highly recommended for infiltrating the Pirate Fortress.',
    howToGet: 'For this mask, you will need Epona, the Lens of Truth and a Bottle of Red Potion. Go to East Termina and head for the Canyon while riding Epona. In the opposite side of the entrance to the Graveyard, you will see a circle of rocks (Right when you enter), use the Lens of Truth to see an injured soldier who\'s asking for help. Give him the Red Potion to heal him and he will give you the Stone Mask as a reward. In the 3DS version, the injured soldier is located in the center of the fortress near the boxes under the central watchtower.'
  },
  {
    id: 'gibdo',
    name: 'Gibdo Mask',
    location: 'Ikana Canyon',
    uses: 'Wearing the mask, Link can talk to other Gibdos. Also makes any nearby Redeads dance.',
    howToGet: 'You will need to purify the Canyon at Ikana by playing the Song of Storms (you get this from Sharp in the Ikana Graveyard) to Flat in the cave. Afterwards use the Stone Mask to access the little house in the middle (The one that plays the creepy circus music) go downstairs and you will find a half-mummified man. Play the Song of Healing to cure him and he will give you the Gibdo Mask.'
  },
  {
    id: 'captain',
    name: "Captain's Hat",
    location: 'Ikana Canyon, Graveyard',
    uses: 'Causes Stalchildren to mistake you for their captain, and needed to get items like Pieces of Heart, Empty Bottles, and The Song of Storms. Also causes nearby Redeads to dance, and causes a humorous dialogue to happen if worn during the Igos du Ikana boss fight.',
    howToGet: 'Go to the Graveyard and go to the place where a Giant Skeleton is sleeping. In front of him play Sonata of Awakening to wake him up and start a battle against him. Use arrows to stun him to hold him from getting to the end of the way. Once you defeat him you will need either the Hookshot or the Bunny Hood to get to the Chest the Mask is in.'
  },
  {
    id: 'giant',
    name: "Giant's Mask",
    location: 'Stone Tower, Eyegore Boss Fight',
    uses: 'Allows Link to become giant in size and take on much larger enemies with ease. This can only be used in boss fights however.',
    howToGet: 'Kill the Eyegore in the Inverted Stone Tower. In the 3DS Version of the game, you will only be able to get the Giant\'s Mask after beating the first worm in the Twinmold boss fight. You won\'t be able to use your sword, but Link will instead use his fists, as well as being able to throw large boulders.'
  },

  // Late Game - Side Quests
  {
    id: 'keaton',
    name: 'Keaton Mask',
    location: 'Clock Town, Kafei\'s Hideout',
    uses: 'Summons a Keaton if any ring of moving bushes are cut down before they all disappear. Answering all of the Keaton\'s questions correctly will reward Link with a Heart Piece.',
    howToGet: 'Complete the Anju and Kafei quest to obtain this mask at Kafei\'s Hideout.'
  },
  {
    id: 'couple',
    name: "Couple's Mask",
    location: 'East Clock Town, Stock Pot Inn',
    uses: 'If worn in the Mayor\'s Office, Link can temporarily stop the eternal argument by appealing to everyone involved. Doing so will reward you with a Heart Piece.',
    howToGet: 'Complete Anju\'s notebook entry by recovering the stolen Sun Mask during the Anju and Kafei quest.'
  },
  {
    id: 'postman',
    name: "Postman's Hat",
    location: 'West Clock Town, Postman\'s Residence, Milk Bar',
    uses: 'With this hat on, Link will have access to any mailbox in Clock Town. The first time Link inspects one, you will find a Heart Piece. Every check thereafter will only yield a single green rupee.',
    howToGet: 'Go through the Kafei notebook entry until you get the Priority Mail. Give it to the Postman, and then talk to him about it on the Final Day.'
  },
  {
    id: 'all-night',
    name: 'All-Night Mask',
    location: 'West Clock Town, Curiosity Shop',
    uses: 'Negates the effect of sleep brought on by listening to one of Anju\'s Grandmother\'s stories.',
    howToGet: 'You must save the Old Lady from Sakon on the first night. Then buy this mask at the Curiosity Shop for 500 Rupees (10:00 PM on the Last Night). You will need to save the old lady from the Bomb-Shop and obtain the Giant\'s Wallet as a reward for clearing out the Skulltula House in Great Bay on the First Day.'
  },

  // Final Reward
  {
    id: 'fierce-deity',
    name: "Fierce Deity's Mask",
    category: 'Transformation',
    location: 'The Moon',
    uses: 'With this mask Link will become a super-powered version of Adult Link. Sporting a giant two-handed sword that can release beams of energy, he is all but unstoppable. This mask can only be worn during boss battles.',
    howToGet: 'As it is the ultimate mask, you will need to first gather all of the other masks in this list. Then, complete the Moon mini-dungeons at the end of the game, and you will trade away all other non-transformation masks to be given the Fierce Deity Mask right before the final boss battle.'
  },
]

function MajorasMaskGuide({ onBack }) {
  const [collectedMasks, setCollectedMasks] = useState(() => {
    const saved = localStorage.getItem('majoras-mask-collected')
    return saved ? JSON.parse(saved) : []
  })

  const [expandedMasks, setExpandedMasks] = useState([])

  useEffect(() => {
    localStorage.setItem('majoras-mask-collected', JSON.stringify(collectedMasks))
  }, [collectedMasks])

  const toggleMask = (maskId, event) => {
    event.stopPropagation()
    setCollectedMasks(prev =>
      prev.includes(maskId)
        ? prev.filter(id => id !== maskId)
        : [...prev, maskId]
    )
  }

  const toggleExpanded = (maskId) => {
    setExpandedMasks(prev =>
      prev.includes(maskId)
        ? prev.filter(id => id !== maskId)
        : [...prev, maskId]
    )
  }

  // Group masks by game progression
  const earlyGame = masks.slice(0, 8)
  const snowhead = masks.slice(8, 11)
  const greatBay = masks.slice(11, 14)
  const ikana = masks.slice(14, 19)
  const lateGame = masks.slice(19, 23)
  const finalReward = masks.slice(23)

  const collectedCount = collectedMasks.length
  const totalCount = masks.length

  const renderMaskList = (maskList) => (
    <div className="masks-list">
      {maskList.map(mask => {
        const isExpanded = expandedMasks.includes(mask.id)
        const isCollected = collectedMasks.includes(mask.id)

        return (
          <div key={mask.id} className={`mask-item ${isExpanded ? 'expanded' : ''}`}>
            <div className="mask-header" onClick={() => toggleExpanded(mask.id)}>
              <input
                type="checkbox"
                checked={isCollected}
                onChange={(e) => toggleMask(mask.id, e)}
                onClick={(e) => e.stopPropagation()}
              />
              <span className={isCollected ? 'collected' : ''}>
                {mask.name}
              </span>
              <span className="expand-icon">{isExpanded ? '▼' : '▶'}</span>
            </div>

            {isExpanded && (
              <div className="mask-details">
                <div className="detail-section">
                  <strong>📍 Location:</strong> {mask.location}
                </div>
                <div className="detail-section">
                  <strong>✨ Uses:</strong> {mask.uses}
                </div>
                <div className="detail-section">
                  <strong>🎯 How to Get:</strong> {mask.howToGet}
                </div>
              </div>
            )}
          </div>
        )
      })}
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
        <p className="tip">💡 Click on any mask to expand and see detailed information. Your progress is automatically saved.</p>
      </div>
    </div>
  )
}

export default MajorasMaskGuide
