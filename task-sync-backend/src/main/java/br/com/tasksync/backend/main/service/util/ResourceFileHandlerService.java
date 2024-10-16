package br.com.tasksync.backend.main.service.util;

import br.com.tasksync.backend.main.port.service.util.ResourceFileService;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

@Service
public class ResourceFileHandlerService implements ResourceFileService {

    @Override
    public String read(String resourcePath) throws IOException {
        final ClassLoader classLoader = ResourceFileService.class.getClassLoader();
        InputStream inputStream = classLoader.getResourceAsStream(resourcePath);
        if (inputStream == null) {
            throw new RuntimeException("Arquivo nao encontrado");
        }
        final BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
        String content = "";
        String line;
        while ((line = bufferedReader.readLine()) != null) {
            System.out.println(line);
            content += line;
        }
        return content;
    }
}
