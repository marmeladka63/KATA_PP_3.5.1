package ru.kata.spring.boot_security.demo.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "firstname" , unique = true)
    @NotEmpty(message = "Имя не должно быть пустым")
    @Size (min =2, max = 30, message = "Имя не должно быть короче 2 смволов и длиннее 30")
    private String username;

    @Column (name = "lastname" )
    @NotEmpty(message = "Фамилия не должно быть пустой")
    @Size (min =2, max = 30, message = "Фамилия не должна быть короче 2 смволов и длиннее 30")
    private String lastname;

    @Column(name = "password")
    @NotEmpty(message = "Пароль не должен быть пустым")
    private String password;

    @Column(name = "email")
    @Email
    @NotEmpty(message = "Email не должен быть пустым")
    private String email;

    @Column(name= "age")
    @Min(value =0, message = "Возраст не может быть меньше 0")
    private int age;


    @ManyToMany(cascade = CascadeType.ALL)
   // @Fetch(FetchMode.JOIN)
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles;

    public User() {
    }

    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }


    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public User(String username, String lastname, String password, String email, int age) {
        this.username = username;
        this.lastname = lastname;
        this.password = password;
        this.email = email;
        this.age = age;
    }

    public Set<Role> getRoles() {
        return roles;
    }

/*
    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
*/

    public String roleToString() {
        return roles.stream().map(Role::getRoleNotPrefix).reduce(((x, y) -> x + ", " + y)).orElse("");
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return getRoles();
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override

    public boolean isAccountNonExpired() {
        return true;
    }

    @Override

    public boolean isAccountNonLocked() {
        return true;
    }

    @Override

    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override

    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return age == user.age && Objects.equals(id, user.id) && Objects.equals(username, user.username) &&
                Objects.equals(lastname, user.lastname) && Objects.equals(email, user.email) &&
                Objects.equals(password, user.password) && Objects.equals(roles, user.roles);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, lastname, age, email, password, roles);
    }

}

