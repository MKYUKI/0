// MinimalHttpServer.java
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import java.io.*;
import java.net.InetSocketAddress;

public class MinimalHttpServer {
    public static void main(String[] args) throws Exception {
        int port = 8080;
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);

        // ルートパス ("/") をハンドリング
        server.createContext("/", new HttpHandler() {
            @Override
            public void handle(HttpExchange exchange) throws IOException {
                // index.htmlを返すだけ
                if ("GET".equalsIgnoreCase(exchange.getRequestMethod())) {
                    File file = new File("index.html");
                    if (file.exists()) {
                        byte[] response = readAllBytes(file);
                        exchange.sendResponseHeaders(200, response.length);
                        OutputStream os = exchange.getResponseBody();
                        os.write(response);
                        os.close();
                    } else {
                        // ファイルが無い場合
                        String notFound = "index.html not found";
                        byte[] resp = notFound.getBytes();
                        exchange.sendResponseHeaders(404, resp.length);
                        exchange.getResponseBody().write(resp);
                        exchange.close();
                    }
                }
            }
        });

        // 他のパスを共通でハンドリング (例: CSSやpageX.htmlなど)
        server.createContext("/static", new HttpHandler() {
            @Override
            public void handle(HttpExchange exchange) throws IOException {
                if ("GET".equalsIgnoreCase(exchange.getRequestMethod())) {
                    // リクエストパスからファイル名を取得
                    String path = exchange.getRequestURI().getPath(); 
                    // 例: /static/page2.html
                    String filename = path.replace("/static/","");
                    File file = new File(filename);
                    if(file.exists()) {
                        byte[] response = readAllBytes(file);
                        exchange.sendResponseHeaders(200, response.length);
                        OutputStream os = exchange.getResponseBody();
                        os.write(response);
                        os.close();
                    } else {
                        String notFound = "File not found: " + filename;
                        byte[] resp = notFound.getBytes();
                        exchange.sendResponseHeaders(404, resp.length);
                        exchange.getResponseBody().write(resp);
                        exchange.close();
                    }
                }
            }
        });

        server.setExecutor(null);
        server.start();
        System.out.println("Java minimal HTTP server started on port: " + port);
    }

    // ファイル読み込み用のユーティリティ
    private static byte[] readAllBytes(File file) throws IOException {
        try (FileInputStream fis = new FileInputStream(file);
             ByteArrayOutputStream bos = new ByteArrayOutputStream()) {
            byte[] buffer = new byte[4096];
            int len;
            while ((len = fis.read(buffer)) != -1) {
                bos.write(buffer, 0, len);
            }
            return bos.toByteArray();
        }
    }
}
