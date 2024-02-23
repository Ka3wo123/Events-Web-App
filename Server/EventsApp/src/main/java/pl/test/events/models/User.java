package pl.test.events.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.proxy.HibernateProxy;

import java.util.List;
import java.util.Objects;


@Entity
@Table(name = "user", schema = "public")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @Column(name = "email",
            nullable = false,
            columnDefinition = "VARCHAR(50)",
            unique = true)
    private String email;
    @Column(name = "name",
            nullable = false,
            columnDefinition = "VARCHAR(50)")
    private String name;
    @Column(name = "surname",
            nullable = false,
            columnDefinition = "VARCHAR(50)")
    private String surname;
    @Column(name = "password",
            nullable = false,
            columnDefinition = "VARCHAR(100)")
    private char[] password;

    @ManyToMany(mappedBy = "users")
    private List<Event> events;

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        User user = (User) o;
        return getEmail() != null && Objects.equals(getEmail(), user.getEmail());
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }

}
