package br.com.tasksync.backend.main.dao.postgres;

import br.com.tasksync.backend.main.domain.GroupModel;
import br.com.tasksync.backend.main.domain.PlanModel;
import br.com.tasksync.backend.main.port.dao.group.GroupDao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class GroupPostgresDaoImplem implements GroupDao {

    private static final Logger logger = Logger.getLogger(GroupPostgresDaoImplem.class.getName());
    private final Connection connection;

    public GroupPostgresDaoImplem(Connection connection) {
        this.connection = connection;
    }


    @Override
    public int add(GroupModel entity) {
        String sql = "INSERT INTO groups(user_id) ";
        sql += " VALUES(?);";
        PreparedStatement preparedStatement;
        ResultSet resultSet;
        try {
            preparedStatement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
            preparedStatement.setInt(1, entity.getAdminId());
            resultSet = preparedStatement.getGeneratedKeys();
            if (resultSet.next()){
                final int id = resultSet.getInt(1);
                entity.setId(id);
            }else {
                throw new RuntimeException();
            }

            resultSet.close();
            preparedStatement.close();

        } catch (SQLException e) {

            try {
                connection.rollback();
            } catch (SQLException ex) {
                throw new RuntimeException(ex);
            }
            throw new RuntimeException(e);
        }
        return entity.getId();

    }

    @Override
    public void remove(int id) {
        final  String sql =  "DELETE FROM groups WHERE id = ?;";
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, id);
            preparedStatement.execute();
            preparedStatement.close();
            logger.log(Level.INFO, "Entidade removida com sucesso");
        } catch (Exception e) {
            throw new RuntimeException();
        }

    }

    @Override
    public GroupModel readyById(int id) {
        return null;
    }

    @Override
    public List<GroupModel> readAll() {
        return List.of();
    }

    @Override
    public void updateInformation(int id, GroupModel entity) {

    }
}
