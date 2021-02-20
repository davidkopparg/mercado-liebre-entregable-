module.exports = function(sequelize, dataTypes) {

    let alias = "Users"; 


    let cols = { 
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull: false
            
        },
        password: {
            type: dataTypes.STRING(100),
            allowNull: false,
            
        }
    };

    let config = { 
        tableName: "users",
        timestamp: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
        paranoid: true
    };

    let Users = sequelize.define(alias, cols, config);
        
    

    return Users; 

}