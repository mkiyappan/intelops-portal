FROM envoyproxy/envoy-dev:latest

COPY ./ml/envoy.yaml /etc/envoy/envoy.yaml

CMD /usr/local/bin/envoy -c /etc/envoy/envoy.yaml -l trace --log-path /tmp/envoy_info.log

# ML code generator
# protoc -I=. ml/ml_server_interface.proto --js_out=import_style=commonjs:. --grpc-web_out=import_style=commonjs,mode=grpcwebtext:. 
