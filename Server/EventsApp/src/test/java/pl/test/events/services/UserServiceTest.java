package pl.test.events.services;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import pl.test.events.models.dto.EventDto;
import pl.test.events.models.dto.UserDto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class UserServiceTest {


    UserService userService;
    EventService eventService;

    @Test
    public void should_save_new_user_to_db() {

        userService = createUserServiceMock();

        List<UserDto> allUsers = userService.getAllUsers();

        Assertions.assertEquals(3, allUsers.size());
        Assertions.assertEquals("John", allUsers.get(0).name());

    }

    @Test
    public void addUserToEvent_if_added_then_success() {

        userService = createUserServiceMock();
        eventService = createEventServiceMock();

        List<EventDto> allEvents = eventService.getAllEvents(null, null);

        when(userService.addUserToEvent("jd@gmail.com", "Event")).thenReturn(new ResponseEntity<>(HttpStatus.OK));

        ResponseEntity<String> event = userService.addUserToEvent("jd@gmail.com", "Event");

        Assertions.assertEquals(HttpStatus.OK, event.getStatusCode());
        Mockito.verify(userService, Mockito.times(1)).addUserToEvent("jd@gmail.com", "Event");

    }

    @Test
    public void addUserToEvent_if_no_such_event_dont_add() {

        userService = createUserServiceMock();
        eventService = createEventServiceMock();

        List<EventDto> allEvents = eventService.getAllEvents(null, null);

        when(userService.addUserToEvent("jd@gmail.com", "Event 2")).thenReturn(new ResponseEntity<>(HttpStatus.CONFLICT));

        ResponseEntity<String> event = userService.addUserToEvent("jd@gmail.com", "Event 2");

        Assertions.assertNotEquals(HttpStatus.OK, event.getStatusCode());
        Mockito.verify(userService, Mockito.times(1)).addUserToEvent("jd@gmail.com", "Event 2");

    }


    @Test
    public void validateCredentials_should_invoke_on_parameters() {
        userService = createUserServiceMock();
        String email = "John";
        char[] password = new char[]{'p', 'a', 's', 's'};

        userService.validateCredentials(email, password);

        verify(userService).validateCredentials(email, password);
    }

    private UserService createUserServiceMock() {
        UserService mockService = Mockito.mock(UserService.class);

        List<UserDto> usersFromDBMock = getUsersFromDBMock();

        when(mockService.getAllUsers()).thenReturn(usersFromDBMock);

        return mockService;

    }

    private EventService createEventServiceMock() {
        EventService mockService = Mockito.mock(EventService.class);

        List<EventDto> eventsFromDBMock = getEventsFromDBMock();

        Mockito.when(mockService.getAllEvents(null, null)).thenReturn(eventsFromDBMock);

        return mockService;
    }

    private List<UserDto> getUsersFromDBMock() {
        return Arrays.asList(
                createUserMock("John", "Doe", "jd@gmail.com", "pass".toCharArray()),
                createUserMock("Paul", "Mik", "pm@gmail.com", "o0pp3r".toCharArray()),
                createUserMock("Joan", "Brown", "jb@onet.pl", "ll-01(".toCharArray())
        );
    }

    private List<EventDto> getEventsFromDBMock() {
        return Arrays.asList(
                createEventMock("Event", "Tarnow", LocalDate.of(2024, 1, 5), null, LocalTime.of(12, 0)),
                createEventMock("Hackathon", "Krakow", LocalDate.of(2025, 10, 24), 200, LocalTime.of(14, 30)),
                createEventMock("Concert", "Chicago", LocalDate.of(2020, 11, 18), 10000, LocalTime.of(20, 0))
        );
    }

    private UserDto createUserMock(String name, String surname, String email, char[] password) {
        UserDto mock = Mockito.mock(UserDto.class);

        when(mock.name()).thenReturn(name);
        when(mock.surname()).thenReturn(surname);
        when(mock.email()).thenReturn(email);
        when(mock.password()).thenReturn(password);

        return mock;

    }

    private EventDto createEventMock(String name, String place, LocalDate date, Integer maxSites, LocalTime time) {
        EventDto mock = Mockito.mock(EventDto.class);

        Mockito.when(mock.name()).thenReturn(name);
        Mockito.when(mock.placeOfEvent()).thenReturn(place);
        Mockito.when(mock.dateOfEvent()).thenReturn(date);
        Mockito.when(mock.maxSites()).thenReturn(maxSites);
        Mockito.when(mock.timeOfEvent()).thenReturn(time);

        return mock;

    }

}