package co.ke.personal.garmet.utility;

import org.apache.commons.lang3.RandomStringUtils;

public class StringUtils {
    public static String generateRefId(int length){
        return RandomStringUtils.randomAlphanumeric(length);
    }

    public static boolean isNotEmpty(String str) {
        return org.apache.commons.lang3.StringUtils.isNotEmpty(str);
    }

    public static String generateNumbers(int length) {
       return RandomStringUtils.randomNumeric(length);
    }

}
