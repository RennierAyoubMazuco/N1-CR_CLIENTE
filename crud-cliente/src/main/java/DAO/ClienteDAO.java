package DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.api.termomecanica.bean.ClienteBean;

import DbUtil.ConexaoDB;

public class ClienteDAO implements Dao {
	
	private Connection connection;

	public ClienteDAO() {
		
		try {
			connection = DbUtil.ConexaoDB.getConnection();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new ArithmeticException("ClienteDao: DB Connect: " + e.getMessage());
		}
	}
	
	//receber lista de cliente
	public void addCliente(ClienteBean c) {
        
    	try {
            PreparedStatement preparedStatement = connection
                    .prepareStatement("INSERT INTO CLIENTE (NOME, EMAIL) VALUES (?, ?)");
            
            preparedStatement.setString(1, c.getNome());
            preparedStatement.setString(2, c.getEmail());         
            preparedStatement.executeUpdate();
            

        } catch (SQLException e) {
            e.printStackTrace();
            
            throw new ArithmeticException("ClienteDao: addCliente: " + e.getMessage()); 
        }
    }
	
	 public void deleteCliente(long id) {
	        try {
	            
	        	PreparedStatement preparedStatement = connection
	                    .prepareStatement("DELETE FROM CLIENTE WHERE ID=?");
	            
	            preparedStatement.setLong(1, id);
	            preparedStatement.executeUpdate();

	        } catch (SQLException e) {
	            e.printStackTrace();
	        }
	    }
	 
	 public void updateCliente(ClienteBean c) {
	        try {
	            PreparedStatement preparedStatement = connection
	                    .prepareStatement("UPDATE USERS SET NOME=?, " 
	                    		                          + "EMAIL=?, " 
	                    		                          + "WHERE ID=?");
	            
	            // Parameters start with 1
	            preparedStatement.setString(1, c.getNome());
	            preparedStatement.setString(2, c.getEmail());
	            
	            preparedStatement.executeUpdate();

	        } catch (SQLException e) {
	            e.printStackTrace();
	        }
	    }

	 public List<ClienteBean> getAllCliente() {
	        
	    	List<ClienteBean> lc = new ArrayList<ClienteBean>();
	        
	        try {
	            Statement statement = connection.createStatement();
	            ResultSet rs = statement.executeQuery("SELECT * FROM CLIENTE");
	            while (rs.next()) {
	                
	            	ClienteBean c = new ClienteBean();	            
	                c.setNome(rs.getString("NOME"));
	                c.setEmail(rs.getString("EMAIL"));


	                lc.add(c);
	            }
	        } catch (SQLException e) {
	            e.printStackTrace();
	        }

	        return lc;
	    }
	 

}
