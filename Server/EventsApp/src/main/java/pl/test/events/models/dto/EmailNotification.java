package pl.test.events.models.dto;

import java.sql.Date;
import java.sql.Time;
import java.util.*;

public record EmailNotification(Long id, String name, Time timeOfEvent, Date dateOfEvent, String placeOfEvent, String email, Boolean isSent) {

}
