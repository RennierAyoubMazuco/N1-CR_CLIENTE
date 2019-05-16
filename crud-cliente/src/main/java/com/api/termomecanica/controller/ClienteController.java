package com.api.termomecanica.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.api.termomecanica.bean.ClienteBean;

import DAO.ClienteDAO;


@Controller
public class ClienteController {

	
	/**
	 * Metodo de inicializacao da pagina
	 *
	 * @param model
	 * @return
	 */
	@RequestMapping("/cliente")
	public String startPage(Model model) {
		initialize(model);
		return "cliente";
	}
	
	/**
     * Inicializa as variaveis da tela
     *
     * @param model
     */
    private void initialize(Model model) {
        try {
        	
        	//trazer a lista de clientes do banco
        	
        	 List<ClienteBean> clientes = new ArrayList<ClienteBean>();
        	 ClienteDAO c = new ClienteDAO();
        	 clientes = c.getAllCliente();
        	 
        	 
        	 //lista manual sem pesquisar no banco, soh para testes
        	 //clientes.add(new ClienteBean("Bruno", "akira@hotmail.com"));
        	 //clientes.add(new ClienteBean("Bruno", "bruno@hotmail.com"));

        	 model.addAttribute("clientes", clientes);
        	
        } catch (Exception e) {
            System.out.println("Erro ao carregar a pagina de Cliente!");
        }
    }

	/**
	 * Cadastra Cliente
	 *
	 * @param ClienteBean
	 *            : Cliente a ser cadastrado
	 * @return
	 */
	@RequestMapping(value = "cadastrar_cliente", params = "cadastrar", method = RequestMethod.POST)
	public String cadastrarCliente(ClienteBean cliente) {

		try {

			System.out.println("cliente a ser cadastrado: " + cliente.toString());

			// chama o dao para salvar o cliente
			ClienteDAO c = new ClienteDAO();
			c.addCliente(cliente);
			

		} catch (Exception e) {
			System.out.println("Erro ao cadastrar Cliente!");
		} // end try/catch

		
		return "cliente";
	}

}
