package proj.obiektowe.auth.di

import org.apache.coyote.Response
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

data class SignInReq(val email: String?, val password: String?)
data class SignUpReq(val email: String?, val password: String?)

@RestController
class AuthController @Autowired constructor(
    private val authService: AuthService
){
    @PostMapping("/sign-in")
    @ResponseBody
    fun signIn(@RequestBody req : SignInReq) : ResponseEntity<Response>{
        var result = authService.signIn(req.email, req.password)
        if(result) return ResponseEntity(HttpStatus.OK)
        else return return ResponseEntity(HttpStatus.UNAUTHORIZED)
    }

    @PostMapping("/sign-up")
    @ResponseBody
    fun signUp(@RequestBody req : SignUpReq) : ResponseEntity<Response>{
        var result = authService.signUp(req.email, req.password)
        if(result) return ResponseEntity(HttpStatus.OK)
        else return return ResponseEntity(HttpStatus.BAD_REQUEST)
    }
}