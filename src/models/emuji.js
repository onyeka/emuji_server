const emuji = (sequelize, DataTypes) => {
  const Emuji = sequelize.define('emuji', {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true
    },
    artist: DataTypes.STRING,
    song: DataTypes.STRING,
    emoji: DataTypes.STRING,
    spotify_uri: {
      type: DataTypes.STRING,
      unique: true
    }
  })
  return Emuji
}

module.exports = emuji