package com.lagaltcase.lagalt_be.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lagaltcase.lagalt_be.associate.Associate;
import com.lagaltcase.lagalt_be.user.User;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Getter
public class UserDetailsImpl implements UserDetails {
    private static final long serialVersionUID = 1L;

    private int id;
    private String username;
    private String email;
    @JsonIgnore //Don't return password for a user
    private String password;
    private String description;
    private boolean hidden;
    private List<String> skills;
    private List<Associate> associatedProjects;

    private Collection<? extends GrantedAuthority> authorities;

    public UserDetailsImpl(int id,
                           String username,
                           String email,
                           String password,
                           String description,
                           boolean hidden,
                           List<String> skills,
                           List<Associate> associatedProjects,
                           Collection<? extends GrantedAuthority> authorities)
    {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.description = description;
        this.hidden = hidden;
        this.skills = skills;
        this.associatedProjects = associatedProjects;
        this.authorities = authorities;
    }

    public static UserDetailsImpl build(User user) {
        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());

        return new UserDetailsImpl(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                user.getDescription(),
                user.isHidden(),
                user.getSkills(),
                user.getAssociatedProjects(),
                authorities);
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
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        UserDetailsImpl user = (UserDetailsImpl) o;
        return Objects.equals(id, user.id);
    }
}
