module.exports =  function(sequelize, dataTypes){

    let alias = "Categories";

    let cols={

        id:{
            type : dataTypes.INTEGER ,  
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type : dataTypes.STRING(100),
        },

        }
        let config = {
            tableName: "categories",
            timestamps: false,
            //createdAt: "created_at",
            //updatedAt: "updated_at",
            //deletedAt: "deleted_at", 
            paranoid: true
        }

    let Categories = sequelize.define(alias, cols, config);

    Categories.associate = function(models){             
        Categories.hasMany(models.Products, {
      
            as: "categories", 
            foreignKey: "category_id"
        })
    }

    return Categories;


}