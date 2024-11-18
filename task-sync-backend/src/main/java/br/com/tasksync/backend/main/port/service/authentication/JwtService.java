package br.com.tasksync.backend.main.port.service.authentication;

import br.com.tasksync.backend.main.domain.UserModel;
import io.jsonwebtoken.Claims;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Date;
import java.util.Map;
import java.util.function.Function;

public interface JwtService {
    String getEmailFromToken(String token);

    Date getExpirationDateFromToken(String token);

    <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver);

    Claims getAllClaimsFromToken(String token);

    boolean isTokenExpired(String token);

    boolean isTokenValid(String token, UserDetails userDetails);

    String generateToken(final UserDetails userDetails,
                         final UserModel.UserRole role,
                         final String email);

    String createToken(Map<String, Object> claims, String subject);

}
