//package com.fintrack.dto;
//
//public class CategoryResponse {
//
//    private Long id;
//    private String name;
//    private String type;
//
//    public CategoryResponse(
//            Long id,
//            String name,
//            String type) {
//
//        this.id = id;
//        this.name = name;
//        this.type = type;
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public String getType() {
//        return type;
//    }
//}


package com.fintrack.dto;

public class CategoryResponse {

    private Long id;
    private String name;
    private String type;

    public CategoryResponse(
            Long id,
            String name,
            String type) {

        this.id = id;
        this.name = name;
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getType() {
        return type;
    }
}