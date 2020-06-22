package enext.backend.test;

import enext.backend.test.tasks.*;
import java.util.Scanner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TestApplication {
	public static void main(String[] args) {
		Scanner imp = new Scanner(System.in);

        LogParser.executar();

        short opt = -1;
        while(opt != 0) {
            System.out.println("===================================");
            System.out.println("Choose an option: ");
            System.out.println("1- Games report");
            System.out.println("2- Players ranking");
            System.out.println("3- API");
            System.out.println("4- Deaths reports");
            System.out.println("0- Exit program");
            System.out.print("Option: ");

            opt = Short.parseShort(imp.nextLine().replaceAll("\\D", ""));

            System.out.print("\n\n");
            
            if (opt == 0) {
            	break;
            }
            else if (opt == 1) {
            	Task1.executar();
            }
            else if (opt == 2) {
            	Task2.executar();
            }
        	else if (opt == 3) {
        		SpringApplication.run(TestApplication.class, args);
        		break;
            }
        	else if (opt == 4) {
        		Plus.executar();
        	}
        	else {
        		System.out.println("Invalid option, try again!!");
        	}
        }


        imp.close();
	}
}