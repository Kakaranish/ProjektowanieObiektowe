package proj.obiektowe.auth.di

import org.springframework.beans.factory.config.ConfigurableBeanFactory
import org.springframework.context.annotation.Scope
import org.springframework.stereotype.Component

@Component
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
class UserRepository {
    private val _validCredentials = mutableMapOf(
        "user@mail.com" to "Test123",
        "user2@mail.com" to "SomePasswd"
    )

    fun addUser(email: String, passwordPlainText: String) : Boolean{
        if(_validCredentials.containsKey(email)) return false

        _validCredentials.put(email, passwordPlainText)
        return true
    }

    fun getPasswdByEmail(email: String) = _validCredentials.getOrDefault(email, null)
}