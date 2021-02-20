module.exports =  function(sequelize, dataTypes){

    let alias = "Products"; 
    
    
    let cols={

        id:{
            type : dataTypes.INTEGER ,  
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title:{
          type : dataTypes.STRING(100),
         allowNull: false
        },

        description:{ 
            type : dataTypes.STRING(255),
            allowNull: false
        },

        photo:{ 
            type : dataTypes.STRING(100),
            allowNull: false
        },

        price:{ 
            type : dataTypes.FLOAT(10,2)
        },


        stock:{ 
            type : dataTypes.INTEGER,
            allowNull: false
        },

        brand_id:{ 
            type : dataTypes.INTEGER,
           
        },
        
        category_id:{ 
            type : dataTypes.INTEGER,
            allowNull: false
        },
        
               

        }
        let config = {
            tableName: "products",
            timestamps: true,
            createdAt: "created_at",
           updatedAt: "updated_at",
           deletedAt: "deleted_at",
            paranoid: true
    }

    let Products = sequelize.define(alias, cols, config);


    Products.associate = function(models){
           
         
         
           
            
        Products.belongsTo(models.Categories, {
        
            as: "category",
            foreignKey: "category_id"
        }),

            
        Products.belongsTo(models.Brands, {
        
            as: "brands",
            foreignKey: "brand_id"
        })

          

    }    
    
    return Products;

}
