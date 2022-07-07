import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../../../utils/dbconfig';
class videos extends Model {
  public id!: number;
  public video_name!:String;
  public video_path!:String; 
}

videos.init(
{
    id: 
    {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    uuid: 
    {
        type: DataTypes.STRING,        
        allowNull: false
    },
    video_name: 
    {
        type: DataTypes.STRING,        
        allowNull: false
    },
    video_path: 
    {
      type: new DataTypes.STRING,
      allowNull: false
    }    
  },
  {
    sequelize,
    tableName: 'video',
    timestamps: false
  }
);

export default videos;
