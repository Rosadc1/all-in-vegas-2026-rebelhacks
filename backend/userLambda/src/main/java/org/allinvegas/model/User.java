package org.allinvegas.model;

import software.amazon.awssdk.services.cognitoidentityprovider.model.UserType;

import java.util.*;

public class User {
    private UUID userID;
    private UserType userType;
    private String userName;
    private String passwordHash;
    private List<UUID> events;

    public enum UserType {
        OPERATOR,
        CUSTOMER
    }

    public  UUID getUserId() { return userID; }
    public void setUserId(UUID userId) {
        this.userID = userId;
    }

    public UserType getUserType() { return userType; }
    public void setUserType(UserType userType) { this.userType = userType; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }

    public List<UUID> getEvents() { return events; }
    public void setEvents(List<UUID> events) { this.events = events; }
}