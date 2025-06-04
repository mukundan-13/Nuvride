package com.nuvride_backend.nuvride.wrapper;

import com.nuvride_backend.nuvride.model.Driver;

public class DriverDistanceWrapper {
    private Driver driver;
    private double distance;

    public DriverDistanceWrapper(Driver driver, double distance) {
        this.driver = driver;
        this.distance = distance;
    }

    public Driver getDriver() {
        return driver;
    }

    public double getDistance() {
        return distance;
    }
}
