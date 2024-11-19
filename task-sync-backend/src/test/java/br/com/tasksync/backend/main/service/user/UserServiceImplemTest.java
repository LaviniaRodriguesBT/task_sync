package br.com.tasksync.backend.main.service.user;

import br.com.tasksync.backend.main.domain.UserModel;
import br.com.tasksync.backend.main.dto.AuthenticationDto;
import br.com.tasksync.backend.main.dto.CreateUserDto;
import br.com.tasksync.backend.main.port.dao.user.UserDao;
import br.com.tasksync.backend.main.port.service.authentication.AuthenticationService;
import br.com.tasksync.backend.main.service.authentication.JwtAuthenticationServiceImplem;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.List;
import java.util.Optional;

class UserServiceImplemTest {

    private UserDao userDao;
    private UserServiceImplem userService;
    private AuthenticationService authenticationService;
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    void setUp() {
        userDao = mock(UserDao.class);
        userService = new UserServiceImplem(userDao);
        passwordEncoder = new BCryptPasswordEncoder();
        authenticationService = new JwtAuthenticationServiceImplem(userService, passwordEncoder);
    }

    // Testando o método create(UserModel)
    @Test
    void testCreateUserSuccess() {
        // Dados do teste
        UserModel userModel = new UserModel();
        userModel.setName("Test User");
        userModel.setEmail("test@example.com");
        userModel.setPassword("password123");
        userModel.setCpf("12345678900");
        userModel.setPhone("123456789");
        userModel.setAddress("123 Test Street");
        userModel.setAccess_type("Administrador");

        // Simulando o comportamento do DAO
        when(userDao.existsCpf(any(String.class))).thenReturn(false); // CPF não existe
        when(userDao.numAdmin(anyInt())).thenReturn(0); // Não há administradores excedendo
        when(userDao.add(any(UserModel.class))).thenReturn(1); // Sucesso ao adicionar
        when(userDao.readyById(anyInt())).thenReturn(userModel);

        // Executando o método
        int result = userService.create(userModel);

        // Verificando o resultado
        assertEquals(1, result);
        verify(userDao).add(any(UserModel.class)); // Verifica se o add foi chamado
    }

    @Test
    void testCreateUserWithEmptyField() {
        UserModel userModel = new UserModel();
        userModel.setName("");
        userModel.setEmail("test@example.com");
        userModel.setPassword("password123");
        userModel.setCpf("12345678900");
        userModel.setPhone("123456789");
        userModel.setAccess_type("Administrador");
        userModel.setAddress("123 Test Street");

        // Executando o método
        int result = userService.create(userModel);

        // Verificando o resultado
        assertEquals(0, result);
        verify(userDao, never()).add(any(UserModel.class)); // Não deve chamar o add
    }

    @Test
    void testCreateUserWithExistingCpf() {
        UserModel userModel = new UserModel();
        userModel.setName("Test User");
        userModel.setEmail("test@example.com");
        userModel.setPassword("password123");
        userModel.setCpf("12345678900");
        userModel.setPhone("123456789");
        userModel.setAddress("123 Test Street");

        // Simulando o comportamento do DAO
        when(userDao.existsCpf(any(String.class))).thenReturn(true); // CPF já existe

        // Executando o método
        int result = userService.create(userModel);

        // Verificando o resultado
        assertEquals(0, result);
        verify(userDao, never()).add(any(UserModel.class)); // Não deve chamar o add
    }

    // Testando o método delete()
    @Test
    void testDeleteUserSuccess() {
        // Simulando o comportamento do DAO
        doNothing().when(userDao).remove(anyInt()); // Não faz nada ao remover

        // Executando o método
        userService.delete(1);

        // Verificando o resultado
        verify(userDao).remove(1); // Verifica se o remove foi chamado com id 1
    }

    @Test
    void testDeleteUserInvalidId() {
        // Executando o método com id inválido
        userService.delete(-1);

        // Verificando que o remove não foi chamado
        verify(userDao, never()).remove(anyInt());
    }

    // Testando o método findById()
    @Test
    void testFindByIdSuccess() {
        UserModel userModel = new UserModel();
        userModel.setId(1);
        userModel.setName("Test User");

        // Simulando o comportamento do DAO
        when(userDao.readyById(anyInt())).thenReturn(userModel);

        // Executando o método
        UserModel result = userService.findById(1);

        // Verificando o resultado
        assertNotNull(result);
        assertEquals("Test User", result.getName());
    }

    @Test
    void testFindByIdUserNotFound() {
        // Simulando que não existe usuário com o id fornecido
        when(userDao.readyById(anyInt())).thenReturn(null);

        // Executando o método
        UserModel result = userService.findById(999);

        // Verificando o resultado
        assertNull(result);
    }

    // Testando o método authenticate()
    @Test
    void testAuthenticateSuccess() {
        AuthenticationDto authenticationDto = new AuthenticationDto();
        authenticationDto.setEmail("test@example.com");
        authenticationDto.setPassword("password123");

        UserModel userModel = new UserModel();
        userModel.setEmail("test@example.com");
        userModel.setPassword("password123");

        userModel.setPassword(passwordEncoder.encode(userModel.getPassword()));


        // Simulando o comportamento do DAO
        when(userService.findByEmail(userModel.getEmail())).thenReturn(userModel);

        // Executando o método
        UserModel result = authenticationService.authenticate(authenticationDto);

        // Verificando o resultado
        assertNotNull(result);
        assertEquals("test@example.com", result.getEmail());
    }

    @Test
    void testAuthenticateFailure() {
        AuthenticationDto authenticationDto = new AuthenticationDto();
        authenticationDto.setEmail("test@example.com");
        authenticationDto.setPassword("wrongpassword");

        // Simulando o comportamento do DAO

        when(userService.findByEmail(authenticationDto.getEmail())).thenReturn(null);

        // Executando o método
        UsernameNotFoundException exception = assertThrows(UsernameNotFoundException.class, () ->
                authenticationService.authenticate(authenticationDto));

        // Verificando o resultado
        assertEquals("Credenciais invalidas", exception.getMessage());
    }
}
