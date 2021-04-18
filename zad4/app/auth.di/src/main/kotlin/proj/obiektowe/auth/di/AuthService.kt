package proj.obiektowe.auth.di

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
class AuthService @Autowired constructor(
    private val userRepository: UserRepository
){
    fun signIn(email: String?, passwordPlaintext: String?) : Boolean {
        if(email == null || passwordPlaintext == null) return false

        var validPasswd = userRepository.getPasswdByEmail(email)
        return validPasswd?.equals(passwordPlaintext) ?: false;
    }

    fun signUp(email: String?, passwordPlaintext: String?) : Boolean {
        if(email == null || passwordPlaintext == null) return false

        return userRepository.addUser(email, passwordPlaintext)
    }
}