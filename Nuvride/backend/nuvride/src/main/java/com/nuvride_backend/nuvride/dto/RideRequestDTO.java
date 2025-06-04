package com.nuvride_backend.nuvride.dto;


public class RideRequestDTO {
    private Long userId;
    private Long driverId;
    private double sourceLat;
    private double sourceLng;
    private double destLat;
    private double destLng;
    private String sourceAddress;
    private String destAddress;
    private Double maxRating;


    public RideRequestDTO(Long userId,Long driverId,double sourceLat,double sourceLng,double destLat,double destLng,String sourceAddress,String destAddress,double maxRating)
    {
        this.userId=userId;
        this.driverId=driverId;
        this.sourceLat=sourceLat;
        this.sourceLng=sourceLng;
        this.destLat=destLat;
        this.destLng=destLng;
        this.sourceAddress=sourceAddress;
        this.destAddress=destAddress;
        this.maxRating=maxRating;
    }

    public Long getUserId()
    {
        return userId;
    }
    public Long getDriverId()
    {
        return driverId;
    }
    public double getSourceLat()
    {
        return sourceLat;
    }
    public double getSourceLng()
    {
        return sourceLng;
    }
    public double getDestLat()
    {
        return destLat;
    }
    public double getDestLng()
    {
        return destLng;
    }
    public String getSourceAddress()
    {
        return sourceAddress;
    }
    public String getDestAddress()
    {
        return destAddress;
    }
    public Double getMaxRating()
    {
        return maxRating;
    }
   
}