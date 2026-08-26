export const classes = [
  {
    name: "Barbarian",
    hitDice: "d12",
    hitPointsLevel1: "12 + Constitution modifier",
    hitPointsHigherLevels:
      "1d12 (or 7) + Constitution modifier per barbarian level",
    proficiencies: {
      armor: ["Light armor", "Medium armor", "Shields"],
      weapons: ["Simple weapons", "Martial weapons"],
      tools: [],
      savingThrows: ["Strength", "Constitution"],
      skills: ["Athletics", "Intimidation", "Nature", "Perception", "Survival"],
    },
    startingEquipment: [
      ["A Greataxe", "or any martial melee weapon"],
      ["Two handaxes", "or any simple weapon"],
      ["An explorer's pack", "or a Dungeoneer's Pack"],
      "Four Javelins",
    ],
    classFeatures: [
      {
        level: 1,
        name: "Rage",
        description:
          "While raging, you gain advantage on Strength checks and Strength saving throws, resistance to bludgeoning, piercing, and slashing damage, and bonus damage on melee weapon attacks using Strength.",
        uses: "2 times per Long Rest",
        bonusDamage: "+2",
      },
      {
        level: 1,
        name: "Unarmored Defense",
        description:
          "While you are not wearing any armor, your Armor Class equals 10 + your Dexterity modifier + your Constitution modifier. You can use a shield and still gain this benefit.",
      },
      {
        level: 2,
        name: "Reckless Attack",
        description:
          "You can make your first attack with advantage on your turn, but attack rolls against you have advantage until your next turn.",
      },
      {
        level: 2,
        name: "Danger Sense",
        description:
          "You have advantage on Dexterity saving throws against effects that you can see, such as traps and spells. You must not be blinded, deafened, or incapacitated to gain this benefit.",
      },
      {
        level: 3,
        name: "Primal Path",
        description:
          "Choose a Primal Path that grants additional features at 3rd, 6th, 10th, and 14th levels. Examples include the Path of the Berserker and the Path of the Totem Warrior.",
      },
      {
        level: 5,
        name: "Extra Attack",
        description:
          "You can attack twice, instead of once, whenever you take the Attack action on your turn.",
      },
      {
        level: 5,
        name: "Fast Movement",
        description:
          "Your speed increases by 10 feet while you aren't wearing heavy armor.",
      },
      {
        level: 6,
        name: "Path Feature",
        description: "You gain a feature from your Primal Path.",
      },
      {
        level: 7,
        name: "Feral Instinct",
        description:
          "You have advantage on initiative rolls, and if you are surprised at the beginning of combat, you can act normally on your first turn if you enter a rage before doing anything else.",
      },
      {
        level: 9,
        name: "Brutal Critical (1 die)",
        description:
          "You can roll one additional weapon damage die when determining the extra damage for a Critical Hit with a melee attack.",
      },
      {
        level: 10,
        name: "Path Feature",
        description: "You gain a feature from your Primal Path.",
      },
      {
        level: 11,
        name: "Relentless Rage",
        description:
          "If you drop to 0 hit points while you're raging and don't die outright, you can make a DC 10 Constitution saving throw. If you succeed, you drop to 1 hit point instead.",
      },
      {
        level: 13,
        name: "Brutal Critical (2 dice)",
        description:
          "You can roll two additional weapon damage dice when determining the extra damage for a Critical Hit with a melee attack.",
      },
      {
        level: 14,
        name: "Path Feature",
        description: "You gain a feature from your Primal Path.",
      },
      {
        level: 15,
        name: "Persistent Rage",
        description:
          "Your rage is so fierce that it ends only if you fall unconscious or choose to end it.",
      },
      {
        level: 17,
        name: "Brutal Critical (3 dice)",
        description:
          "You can roll three additional weapon damage dice when determining the extra damage for a Critical Hit with a melee attack.",
      },
      {
        level: 18,
        name: "Indomitable Might",
        description:
          "If your total for a Strength check is less than your Strength score, you can use that score in place of the total.",
      },
      {
        level: 20,
        name: "Primal Champion",
        description:
          "Your Strength and Constitution scores increase by 4. Your maximum for those scores is now 24.",
      },
    ],
    subclasses: [
      {
        name: "Path of the Berserker",
        features: [
          {
            level: 3,
            name: "Frenzy",
            description:
              "When you rage, you can choose to go into a frenzy. During the frenzy, you can make a single melee weapon attack as a bonus action on each of your turns after this one. When your rage ends, you suffer one level of exhaustion.",
          },
          {
            level: 6,
            name: "Mindless Rage",
            description:
              "You can't be charmed or frightened while raging. If you are charmed or frightened when you enter your rage, the effect is suspended for the duration of the rage.",
          },
          {
            level: 10,
            name: "Intimidating Presence",
            description:
              "You can use your action to frighten someone with your menacing presence. When you do so, choose one creature that you can see within 30 feet of you. If the creature can see or hear you, it must succeed on a Wisdom saving throw (DC 8 + your proficiency bonus + your Charisma modifier) or be frightened of you for 1 minute. The creature can repeat this saving throw at The End of each of its turns, ending the effect on itself on a success.",
          },
          {
            level: 14,
            name: "Retaliation",
            description:
              "When you take damage from a creature that is within 5 feet of you, you can use your reaction to make a melee weapon attack against that creature.",
          },
        ],
      },
      {
        name: "Path of the Totem Warrior",
        features: [
          {
            level: 3,
            name: "Spirit Seeker",
            description:
              "You gain the ability to cast The Beast Sense and Speak with Animals spells, but only as rituals.",
          },
          {
            level: 3,
            name: "Totem Spirit",
            description:
              "When you adopt this path, you choose a totem spirit and gain its feature. Examples include the Bear, Eagle, or Wolf, each granting different benefits. The Bear provides resistance to all damage except psychic while raging, the Eagle enhances mobility, and the Wolf helps allies by granting them advantage on melee attacks.",
          },
          {
            level: 6,
            name: "Aspect of The Beast",
            description:
              "You gain a magical benefit based on the totem animal of your choice. For example, the Bear increases your carrying capacity, the Eagle allows you to see long distances, and the Wolf improves your tracking abilities.",
          },
          {
            level: 10,
            name: "Spirit Walker",
            description:
              "You can cast Commune with Nature as a ritual. When you do so, a spiritual version of your totem animal appears to you to convey the information you seek.",
          },
          {
            level: 14,
            name: "Totemic Attunement",
            description:
              "You gain a powerful magical benefit based on the totem animal of your choice. For example, the Bear prevents enemies from moving through spaces within 5 feet of you, the Eagle allows you to fly while raging, and the Wolf lets your allies knock enemies prone.",
          },
        ],
      },
      {
        name: "Path of the Ancestral Guardian",
        features: [
          {
            level: 3,
            name: "Ancestral Protectors",
            description:
              "When you enter your rage, spectral warriors appear around you. While you're raging, the first creature you hit with an attack on your turn becomes the target of the warriors, which hinders its attacks. That target has disadvantage on any attack roll that isn't against you.",
          },
          {
            level: 6,
            name: "Spirit Shield",
            description:
              "If you or an ally within 30 feet of you takes damage, you can use your reaction to reduce that damage by 2d6. This increases to 3d6 at 10th level and 4d6 at 14th level.",
          },
          {
            level: 10,
            name: "Consult the Spirits",
            description:
              "You can cast the Augury or Clairvoyance spells, without using a spell slot or material components. After you cast either spell in this way, you can't cast it again until you finish a short or Long Rest.",
          },
          {
            level: 14,
            name: "Vengeful Ancestors",
            description:
              "When you use your Spirit Shield to reduce damage, the attacker takes force damage equal to the damage prevented.",
          },
        ],
      },
      {
        name: "Path of the Storm Herald",
        features: [
          {
            level: 3,
            name: "Storm Aura",
            description:
              "You emanate a stormy, magical aura while raging. Choose Desert, Sea, or Tundra. Each grants a different effect while raging: Desert deals fire damage to creatures around you, Sea shocks a creature you hit, and Tundra grants temporary hit points to you and your allies.",
          },
          {
            level: 6,
            name: "Storm Soul",
            description:
              "You gain resistance to the damage type associated with your Storm Aura. For example, fire for Desert, lightning for Sea, or cold for Tundra. You also gain environmental benefits, such as immunity to extreme heat or cold, or the ability to breathe underwater.",
          },
          {
            level: 10,
            name: "Shielding Storm",
            description:
              "Each creature of your choice gains the damage resistance granted by your Storm Soul while in your aura.",
          },
          {
            level: 14,
            name: "Raging Storm",
            description:
              "Your storm grants additional effects while raging. For example, Desert causes creatures in your aura to take fire damage when they hit you, Sea forces creatures you shock to make a Strength save or be knocked prone, and Tundra reduces the speed of enemies in your aura.",
          },
        ],
      },
      {
        name: "Path of the Zealot",
        features: [
          {
            level: 3,
            name: "Divine Fury",
            description:
              "While you're raging, the first creature you hit on each of your turns takes extra damage, depending on your alignment. You deal 1d6 + half your barbarian level as necrotic or radiant damage (depending on your alignment).",
          },
          {
            level: 3,
            name: "Warrior of the Gods",
            description:
              "Your soul is marked for endless battle. If a spell, such as Raise Dead, has the sole effect of restoring you to life (but not undeath), the caster doesn't need material components to cast the spell on you.",
          },
          {
            level: 6,
            name: "Fanatical Focus",
            description:
              "You can reroll a saving throw that you fail while raging. You must use the new roll, and can use this ability once per rage.",
          },
          {
            level: 10,
            name: "Zealous Presence",
            description:
              "You can use your bonus action to unleash a Battle Cry infused with divine energy. Up to 10 creatures of your choice within 60 feet of you gain advantage on attack rolls and saving throws until the start of your next turn.",
          },
          {
            level: 14,
            name: "Rage Beyond Death",
            description:
              "While you're raging, having 0 hit points doesn't knock you unconscious. You still must make death saving throws, and you suffer the normal effects of taking damage while at 0 hit points. If you die while raging, you don't drop to 0 hit points until your rage ends.",
          },
        ],
      },
      {
        name: "Path of the Battlerager",
        features: [
          {
            level: 3,
            name: "Battlerager Armor",
            description:
              "You gain the ability to use spiked armor as a weapon. While you are wearing spiked armor and raging, you can use a bonus action to make a melee weapon attack with your armor's spikes. If you hit with this attack, the target takes 1d4 piercing damage.",
          },
          {
            level: 6,
            name: "Reckless Abandon",
            description:
              "When you use Reckless Attack while raging, you also gain temporary hit points equal to your Constitution modifier (minimum of 1).",
          },
          {
            level: 10,
            name: "Battlerager Charge",
            description:
              "You can take the Dash action as a bonus action while raging.",
          },
          {
            level: 14,
            name: "Spiked Retribution",
            description:
              "When a creature within 5 feet of you hits you with a melee attack, the attacker takes 3 piercing damage if you are wearing spiked armor and raging.",
          },
        ],
      },
    ],
  },
];
